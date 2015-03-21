---
layout: post
title:  "Why did I choose Jekyll"
categories: tech
---

### Choices, choices, choices...

I was looking into quite a few blogging platforms to start, such as [Wordpress][1], [Ghost][2], [Tumblr][3], [WolfCMS][4] - to name a few. Jekyll was not one of them, actually I didn't even know Jekyll existed at the time. Anyway, I went ahead and purchased a domain and hosting solution with [Mediatemple][5], with Wordpress(WP) in mind as the blogging platform of choice. For the sole reason being, I've worked with WP sites before and I figured it'd be the fastest to get set up and blogging.

### The WTF moment

Not too long after my transaction, I told a friend about my purchase and the blogging platform that I chose to go with. And that is when he said:

> Dude, you can blog for free on Github - AND have it hosted for free with a free domain!

To which I replied:

> WTF man?! You tell me this now, after all my purchaces..

I quickly came to realize it wasn't his fault that I rushed into making my purchaces, I just got hyped at that moment. Anyway, I did know about the free hosting and domain (actually it's a sub-domain) that Github offers through [Github Pages][6] for anyone with an account - because I did already have one (which you guys can see [here][7]). What I didn't know was that it offered it's own solution for blogging out of the box.

### Research

So I started doing my research on this black magic of a solution my friend mentioned. One of the first hits on google was [this blog post][8] by Joshua Lande. I'll let you read the post for yourself, but I was immediately sold on the idea of literally letting Jekyll be Jekyll. What I mean by that is, because everything is rendered as static files, I don't need to worry about databases, security, unnecessary plugins etc, etc, etc. With Jekyll I only need to worry about writing - which is exactly what a blogging platform should be about. Of course it also leaves room for personalization, which I'm very excited to get my hands dirty with (being a frontend developer).

### Up and Running in minutes

As the [Jekyll homepage][9] says, you can get up and running in seconds - and true enough I literally got up and running with the following commands (sorry Windows users, you guys got a [few more steps][10]).

{% highlight shell-session %}
~ $ gem install jekyll
~ $ cd github-repo
~/github-repo $ jekyll new .
~ $ jekyll serve
{% endhighlight %}

The `jekyll serve` command let me test the blog on my machine locally. Once I figured out how things were working, having skimmed through the [documentation on posts][11], I just backed up my [old site][7] and pushed the changes to my repo. With that I had my very own simplistic blogging platform ready for use.

There was one little problem though - what was I going to do with the domain and hosting service I purchased with Mediatemple..?

### Peace of mind

I'm not going to lie, this section of my post is here to commend Mediatemple on their great customer service. So, I called Mediatemple's customer service and told them I rushed into purchasing the domain and hosting service with them, and was hoping to cancel my services and get a refund. They do have a 30 day money back gaurantee plan, but I was surprised it also applied for the domain registration as well (this may or may not be true, as there as a little confusion with a couple of their reps regarding this matter). Long story short, they were able to fully refund me for the purchase and I'm now happily blogging on Jekyll :)

### What's next

The next thing I'll be working on is theming my blog. I'm currently looking for a CSS framework to build on - I don't want to go with Bootstrap again. Nothing against Bootstrap, I think it's awesome, I just want to try something new and different. I might even just make my own foundation from scratch, we'll see.

[1]: https://wordpress.org/
[2]: https://ghost.org/
[3]: https://www.tumblr.com/
[4]: https://www.wolfcms.org/
[5]: http://mediatemple.net/
[6]: https://pages.github.com/
[7]: http://svignara.github.io/old-site/
[8]: http://joshualande.com/jekyll-github-pages-poole/
[9]: http://jekyllrb.com/
[10]:    http://jekyll-windows.juthilo.com/
[11]:    http://jekyllrb.com/docs/posts/