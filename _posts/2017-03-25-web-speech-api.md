---
layout: post
title:  "Creating a Voice Assistant with Web Speech API"
date:   2017-03-25 19:05:10
categories: experiments
description: "This is a demonstration of how the SpeechRecognition and SpeechSynthesis interfaces of the Web Speech API can be used to create a voice assistant for a website."
comments: true
---

## Project description

First and foremost, let me just say this was MAD fun to build. It was the first time in a while I built something where I was able to play around with what I was building, during development. It almost reminded me of when I used to build crazy shit with Lego as a kid. It also turned out to be the first time in my javascript development life where I programmed with a different philosophy in mind. I'll explain what I mean, because this is one of those "EUREKA" moments for me.

*But before I go into that, for those of y'all that don't care to read about the explanation or just too damn curious and want figure it out yourselves: click [here][1] for the code, and click [here][2] for the demo. I added a few `console.log` messages throughout to help y'all follow along with the flow of the events. And don't worry, I won't hold it against you.*

So what do I mean by my philosophy for programming changed? Well, while developing this app, what I realized was almost every function I wrote existed as a result of an action of another function. *(Family guy cutaway moment: If you wana get deep with it, this is essentially how the universe works. Everything happens as a result of the actions of something else. Butterfly effect MF.)* ANYWAYS, I'm not talking about the regular DOM event callbacks neither. These events are essentially one part of the code, standing on top of a mountain, screaming out to everyone **"Hey! I did something, in case anyone's listening!"**. I came to realize this paradigm is actually known as "Event Driven Development". One of my co-workers explains it a lot nicer, check out his take on it [here][3].

Now that we got all that philosophical shit out of the way, let's get right into it. **What does this "Voice Assistant" do?** Think Siri/Google Assistant/Alexa/Cortana, but for your own website. And a lot dumber than those assistants. Well dumber for now, there's the potential for it to be great - afterall "Impossible is nothing" (quote from the Late, Great Muhammad Ali himself).

## Technologies used

Remember the whole spiel about "Event Driven Development". Well, turns out there's actually a javascript design pattern for it, and it's called "PubSub" - or Publish/Subscribe pattern. I'm not going to explain the pubsub concept here, this is not the post for it, but just know the entire Voice Assistant app I'm working on depends on it. If you want to know more about pubsub, I highly recommend you checking out [David Walsh's post on it][4] and studying his code. I mean, I literally just stole the dude's code and renamed the terminologies to an analogy that made more sense to me. (Yes, the terms `publish` and `subscribe` were too overwhelming for me, so I changed it to `broadcast` and `listen`. I ain't never published or subscribed to nothing - subscriptions requires payments, so..ye... I have however listened to a lot of broadcasts, so see how I can relate to the broadcast analogy more. And I know, I know, once the [Broadcast Channel API][5] gets some traction my terminology is gona be obsolete, so I've already started to look for other analogies for pubsub - I am open for suggestions though!).

ANYWAY - with my `pubsub` object set up, it was easy to organize my code between `broadcasts` and `broadcast listeners`. I wrapped these in functions for readability, but probably could have done away with the wrapping functions. You'll notice if you remove all the wrapper functions, the code starts to look a lot like something written in `NodeJS`. Well, because `NodeJS` is event-driven - DUH! *(Sorry, I had do.)*

### The code set-up

#### Assistant voice

First thing's first, we need to make sure the Assistant has a voice. So, coincidentally the first `broadcast` I set up was on the `voiceschanged` event of the `SpeechSynthesis` object.

```javascript
speechSynth.addEventListener('voiceschanged', function(){
    Broadcast.broadcast('/assistant/voicechange', speechSynth);
}, {once : true});
```

Honestly, I have NO idea how this event gets triggered. I tried to trace it back, but the only thing I can conclude is it gets fired based on when the Browser makes the voices available after the `SpeechSynthesis` object has been declared. If you want to take a stab at trying to make sense of this event though, have a look at the [documentation][6] and please let me know!

The `SpeechSynthesis` is the interface that gives you control of the speech service on your browser. However, the `SpeechSynthesisUtterance` is the object that you instantiate to actually control the voice rendering, such as: text and rate of your assistant's speech. So once the voices are available on the browser, we can set up the `utterance` object defaults. We do this by listening to the `'/assistant/voicechange'` broadcast we set up in the previous step.

```javascript
Broadcast.listen('/assistant/voicechange', function(synth){
    voices = speechSynth.getVoices();
    var preferredVoice = voices.find(_findGoogleVoice);
    utterance.voice = preferredVoice ? preferredVoice : voices[0];
    utterance.rate = 1;
});
```

The `getVoices()` method of the `SpeechSynthesis` object returns an array of available voices on the browser. I use the [`Array.prototype.find()`][7] method to find the Google Assistant voice (in English) if available, since I feel like it's the most human-sounding one.

#### Assistant speech, the utterance

Now that our assistant has a voice, it can start to speak. As mentioned before the `SpeechSynthesisUtterance` object is what's used to handle the speech instance of the assistant. We first give some speech context to the `utterance` object, which is done by assigning to the `utterance.text` property. This is what the assistant will speak out loud to the user. To trigger the speech, we use the `SpeechSynthesis` interface to trigger the speech event on the `utterance` instance. This is done by passing the `utterance` object into the `speak()` method: `speechSynth.speak(utterance);`.

At this point, it's probably a good idea to set up some `broadcasts`, to let the app know of the speech event. The `SpeechSynthesisUtterance` has quite a [few events][8], but I'm only going to be listening and broadcasting a few.

```javascript
utterance.addEventListener('start', function(event){
    interactions.speaking = true;
    Broadcast.broadcast('/assistant/speech/start', { event : event, interactions : interactions });
});
utterance.addEventListener('end', function(event){
    interactions.speaking = false;
    Broadcast.broadcast('/assistant/speech/end', { event : event, interactions : interactions });
});
utterance.addEventListener('error', function(event){
    Broadcast.broadcast('/assistant/speech/error', { event : event, interactions : interactions });
});
```

The events are pretty self-explanatory: `start` is when the assistant has just started to speak, `end` is when the assistant has completed it's speech text, and `error` is if something went wrong during the speech. You'll also notice I'm passing an `interactions` object to the `broadcast`. I'll address this object later, but it basically helps determine the different states of the application throughout the event flow.

#### Speech Recognition

Ok! So our assistant has a voice, and our assistant can speak. Now we need to make our assistant listen to us. This is where the `SpeechRecognition` object comes into play. There are some defaults to assign to the `SpeechRecognition` object you instantiate.

```javascript
var speechRec = (!!window.SpeechRecognition || !!window.webkitSpeechRecognition || !!window.mozSpeechRecognition || !!window.msSpeechRecognition) ? new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)() : false;

speechRec.continuous = false;
speechRec.interimResults = false;
speechRec.lang = 'en-US';
```

For an explanation on these properties, take a look at the [documention][9]. They do a pretty well job explaining what those properties are used for, but essentially this configuration ensures that the assistant is not continuously listening to the user, and will only return one result once it thinks the user is done speaking.

*__Side note:__ Oh ye - and I do that whole crazy check to see if the `SpeechRecognition` is available, because only a few browsers actually support it natively. And even then, it's only supported with the browser prefixes - even on chrome, hence the `webkitSpeechRecognition`.*

Now that the defaults are set up for the `SpeechRecognition` object, to actually make the assistant start listening, you use the `start()` method: `speechRec.start();`. (**Note:** Had I set it up to continuously listen, then I'd have to manually stop the recognition using the `speechRec.stop()` method.)

Just like we did when the Assistant was speaking, we want to set up broadcasts on the events that are fired during the recognition process.

```javascript
speechRec.addEventListener('start', function(event){
    Broadcast.broadcast('/assistant/listening/start', { event : event, interactions : interactions });
});
speechRec.addEventListener('end', function(event){
    interactions.listenToUser = false;
    Broadcast.broadcast('/assistant/listening/end', { event : event, interactions : interactions });
});
speechRec.addEventListener('result', function(event){
    interactions.listenToUser = false;
    Broadcast.broadcast('/assistant/listening/recognized', { event : event, interactions : interactions });
});
speechRec.addEventListener('error', function(event){
    interactions.listenToUser = false;
    Broadcast.broadcast('/assistant/listening/error', { event : event, interactions : interactions });
});
```

#### Interaction states

So what is that `interactions` object I'm passing around all about? The `interactions` object basically helps the assistant know what it's supposed to be doing when certain things happen, like when it's done speaking or listening. Imagine you're having a conversation with someone; when they're talking, you should be listening. Otherwise, it'd just be rude wouldn't it? That's exactly what this `interactions` helps the voice assistant do. It has the following properties:

```javascript
interactions = {
    gaveIntro : false,
    speaking : false,
    listenToUser : false,
    executeCommand : false,
    selectedCommand : {}
}
```

Where,
<br>`gaveIntro`: Reminds the assistant that it's already given it's intro and to not repeat that whenever the user hits the `wake up` button.
<br>`speaking`: Makes the assistant conscious that it's currently talking.
<br>`listenToUser`: Makes the assistant aware that it's just asked a question to the user, and should be listening to the user for a response.
<br>`executeCommand`: Tells the assistant that the user's said a valid command that it can execute.
<br>`selectedCommand`: Helps the assistant remember the valid command the user just said.

#### Processing user commands

Remember how I said before that this assistant is a lot dumber than Siri or Google Assistant, but it has the potential to be great. I wasn't lying, for now it is pretty dumb compared to those other two - but that's because I haven't introduced the assistant to concepts like Natural Language Processing or Machine Learning yet. Rest assured, these are in the queue of **TODOs** though. For now, and for the purpose of this experimental project, I set up an array of predetermined commands that it can respond to.

Ok, with that out of the way, we want the assistant to process the user's speech once it's recognized something. So, we listen for the `'/assistant/listening/recognized'` broadcast.

```javascript
Broadcast.listen('/assistant/listening/recognized', function(data){
    var msg = data.event.results[0][0].transcript;
    if (msg.indexOf(`***`) > -1){
        respondToProfanity();
        return false;
    }
    respondToUserCommand(_findCommand(msg));
});
```

The result of the speech recognition is stored in the `event` object that's passed into the callback function. It can be found in the `transcript` propery of the first element of the results array: `msg = data.event.results[0][0].transcript`. As you can see in the code, the `SpeechRecognition` interface will actually censor out profanity. So we can check for that ``msg.indexOf(`***`)``, and respond accordingly. I have a PG13 response to it, but you could technically make it respond back with profanity, which ironically it doesn't censor out.

The `_findCommand(msg)` helper function will filter through the command list and return a command that matches with any words that were recognized during the speech recognition process. The `respondToUserCommand()` function will then determine how to respond based on if a command is found, and what type of command it is. For example, if the user asked to visit a page, it'll take the user to the page; or if the user asked a question, it'll respond to the question.

```javascript
function respondToUserCommand(command){
    interactions.executeCommand = !!command;
    interactions.selectedCommand = (interactions.executeCommand) ? command : {};
    if (interactions.executeCommand){
        if (interactions.selectedCommand.response){
            utterance.text = interactions.selectedCommand.response;
        }else if (interactions.selectedCommand.href){
            utterance.text = `Ok! Let's go to the ${interactions.selectedCommand.command} page.`;
        }
    }else{
        utterance.text = `I'm sorry. I don't understand.`;
    }
    speechSynth.speak(utterance);
}
```

The `executeCommand` property will tell the assistant if a command matches something the user has said. And based on what type of command it is (if there's a `response` to a question, or `href` to navigate), it'll respond accordingly.

In the future, this will be a backend process. The recognized speech will be processed and analyzed to understand the subject, keywords and sentiment of the user's speech. The result of the analysis will then be used to query for a matching answer, likely with some threshold value - because it won't be a perfect hit all the time. It sounds stupid simple when I write it out, but will probably be MAD difficult to actually do. OR it might easy, I'll let y'all know in the next segment :).

### Helpful links:

If you're interested in this project, or using the Web Speech API for other projects, or just interested in dabbling with it - I highly recommend these resources:

- [Using the Web Speech API][9]
- [Speech Synthesiser demo][10] (View source on this)
- [SpeechSynthesis Documentation][11]
- [SpeechSynthesisUtterance Documentation][12]
- [SpeechRecognition Documentation][13]

And again, here are the links to the source code and demo of the Voice Assistant app I'm working on:

- [Source code][1]
- [Demo][2]

[1]: https://github.com/svignara/voice-assistant
[2]: https://svignara.github.io/voice-assistant
[3]: https://marceloluz.com/blog/separating-logic-from-style#event-driven-development
[4]: https://davidwalsh.name/pubsub-javascript
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
[6]: https://developer.mozilla.org/en-US/docs/Web/Events/voiceschanged
[7]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
[8]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance#Event_handlers
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
[10]: http://mdn.github.io/web-speech-api/speak-easy-synthesis/
[11]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
[12]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
[13]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition