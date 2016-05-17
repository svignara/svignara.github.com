---
layout: post
title:  "Get Conversion Rate"
date:   2016-05-08 00:53:54
categories: experiments
description: "This is a simple API that lets you get the conversion rate of one currency to another. It also allows you to get the converted value, if one is passed through."
comments: true
---

## Project description:
First of all, let me just start of by saying I don't know if this is a legit thing to do - as I'm basically hitting Google Search everytime, and scraping the DOM in a headless browser for the data that's needed. If Google tells me to stop doing this, I'll definitely take it down - but for now I'm just going to treat it as doing a Google search each time the request is made (because that is what this essentially is).

A little while ago, someone asked me if I could build a foreign exchange chart that can convert values on the fly. The chart initially had the exchange rate for different currencies to CAD, the ask was to make it so they can use the same exchange feed - but display the results in USD instead. Now, I know I could've used the USD to CAD factor from the initial feed to calculate the results of the other currencies. I could've also possibly used other APIs. But, what fun is that really? Hence why I created my own.

I knew you can Google the conversion rates between 2 currencies, and google gives you the results in a nice chart. All I had to do was query the DOM to grab those results, and return them in a nice JSON object for me to use in any application.

The **Express** module was used to build out the API routes. And by routes, I mean just the one route - which is `/api/convert` :sweat_smile:. That one route though, can handle quite a bit - and that's thanks to the **jsdom** node module. What **jsdom** allows you to do is basically load a page in a "headless" browser, and be able to run javascript code on the DOM. I would recommend reading their [documentation][1] for full features and how-tos. I can see a huge use case for this module from an automation testing perspective. So if that's your thing, definitely check it out.

There are some very neat stuff in there, but I'll just highlight one of the cool things - which is being able to set the `userAgent` in the request. This was a HUGE gotcha for me, because I kept getting stuck when making the request with just the search params in the URL. For whatever reason, the response just gave me the list of results, but not the chart with the values in there. My assumption is, when Google sees the search page requested from a non-device browser (probably) they just return the list of search results, and not the little UI chart that lets you change values. Which makes sense, because who/what would be messing around with that stuff from a non-device browser. Anyway, setting the `userAgent` in the request solved that for me:

```javascript
jsdom.env({
    url: "https://www.google.com/search?q=" + encodeURI(sendQ),
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    done: function(err, window){ /* did my thing... */ });
});
```

For a full description on how to use the API, please check out the Github page: [https://github.com/svignara/get-conversion-rate][2]. I also have this deployed on heroku for testing purposes - feel free to check it out and make some requests if you're curious: [https://get-conversion-rate-from-suvi.herokuapp.com/api/][3].

## Technologies used:
* Express
* jsdom

## Link to project:
[Project on Github][2]<br>
[Test API][3]<br>
[JSFiddle sample][4]

[1]: https://www.npmjs.com/package/node-jsdom
[2]: https://github.com/svignara/get-conversion-rate
[3]: https://get-conversion-rate-from-suvi.herokuapp.com/api/
[4]: https://jsfiddle.net/svigna/f47Lnsbq/