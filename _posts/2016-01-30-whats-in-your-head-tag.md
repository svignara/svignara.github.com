---
layout: post
title:  "What's in your `&lt;head&gt;` tag? Pt 1."
date:   2016-01-30 12:51:12
categories: front-end
description: "Part 1 of this post will look at some useful tags for Search Engine Optimization (SEO) to add to the `&lt;head&gt;` element of your site."
comments: true
---

We are in the midst of updating our company's website templates and a co-worker introduced me to a bunch of meta data to add to the `<head>` element for SEO and Social Networking best practices. In this post I'm going to list out some of these tags for SEO (Part 2 will cover Social), and give a brief description on them - hopefully you can take these findings and apply it to your own sites.

Now, my understanding is these tags have been around since time, however when I view-source on many websites I fail to see them in use. That being said, I'm sorry if this is old news to some of you. Also, the list below is definitely not complete, and I'm sure there are many more out there that I've missed. Feel free to leave a comment on ones you've used, or if you have anything else to add as well!


## Tags for Search Engines

### The meta description

Let me start with one that you all might already know, but maybe not the rookies out there:

{% highlight html %}
<meta name="description" content="Here is a description of my awesome website!">
{% endhighlight %}

The key purpose of the meta description tag is to display a preview of what the page is about in Search Engine Result Pages (SERPs). It's the little snippet you see under the page title and links on a google search result, for example. It's no more than roughly 155 characters long, so it's important to effectively convey relevant information about the page within that constraint. After all, this is what people are seeing about your page when the search for it on search engines.

Now, the description doesn't really help in search engine rankings, but it does play a huge role in if a user finds relevant information to the terms they searched, and eventually clicking through to your page. [For your reference][1].

### The meta keywords (to use or not to use?)

{% highlight html %}
<meta name="keywords" content="meta,tags,keywords,seo,html,puppies">
{% endhighlight %}

The keywords plays **no factor** in your page's search rankings (or so I've [read][2]). It looks like at one point in time it did, but then I guess search engines started to notice that it was getting abused - so they dropped using it as a factor for search ranks. As you can see in the example up top, if someone were to search for "puppies", they may see my page as one of the results somewhere in the SERPs. Instead, crawlers will just go through your page content itself for relevant keywords, and not use these "off-page" factors for rankings.

It's important to note though, Google's enterprise product, Google Search Appliance, can use the meta keywords tag to match pages to terms within the company's site search itself.

### The Canonical URL

The Canonical URL is set using the `<link>` element as follows:

{% highlight html %}
<link rel="canonical" href="http://www.my-awesome-site.com/">
{% endhighlight %}

What the canonical URL will ensure is that search engines consolidate page rankings to one URL. This is especially important when you have multiple URLs directing to the same page content. For example, `http://www.my-awesome-site.com/`, `http://www.my-awesome-site.com/index.html`, `https://www.my-awesome-site.com/` and `http://my-awesome-site.com/` all refer to the same page. However, if they're referred in their multiple ways on other pages (via the variety of links) - then in search results you may get multiple results for the same page. What the canonical URL does is it consolidates those page ranks into the one canonical URL you define. For further reading please refer to [Google's guidelines][3] on using canonical URLs.


[1]: https://moz.com/learn/seo/meta-description
[2]: https://googlewebmastercentral.blogspot.ca/2009/09/google-does-not-use-keywords-meta-tag.html
[3]: https://support.google.com/webmasters/answer/139066?hl=en