---
layout: post
title:  "Going with Bootstrap"
categories: tech
---

### Why Bootstrap

In my [earlier post]({% post_url 2015-03-21-why-jekyll %}) I had mentioned my next steps was to choose a CSS framework to theme my blog, or to create one myself from scratch. I also explicitly said I don't want to use Bootstrap, because I wanted to try something new instead. Well, I ended up going with Bootstrap in the end - for a number of reasons. The main reason being, I was spending way too much time investigating and looking into other frameworks. Time that I wanted to spend blogging, or reading on material that I wanted to blog about. Besides, I already knew what I was getting with Bootstrap, from having used it previously, and it's a really awesome framework to get up and running with a site/blog. In my defense, the last time I used Bootstrap was version 2 (when it was still a Twitter project), so if you want to be technical this is a "new" framework for me (just kidding).

### Folder Structures

Anyways, I did want to share one thing that might be helpful for those of you starting out with Jekyll. You might notice when you run the `jekyll new` command to build the project directory, there is a `_sass` and a `css` folder added to the root directory of your blog. Now, I don't know about you guys - but it really bugs me having assets like css, js, fonts, etc. just out there in the root. So I figured I'd make an `assets` folder and drop the `_sass` and `css` folders in there, along with my vendor assets (in this case Bootstrap and I also included jquery).

### Sass Build Breaks Jekyll

As the heading suggests, the folder rearrangment caused an error when I ran `jekyll serve` to test the blog locally. The error occurred in the `@import` statements of the `main.scss` file. It seems by default Jekyll actually sets the `_sass` directory in the root as the location for Sass includes. Fortunately, there is an attribute that can be set in the `_config.yml` file to override this, which is:

{% highlight yaml %}
sass:
    sass_dir: choose/your/own/path/_sass
{% endhighlight %}

This tells Jekyll that any Sass files referenced with the `@import` will be served from whatever directory you specified in `sass_dir`.