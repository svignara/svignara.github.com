---
layout: post
title:  "Measure Your Speed"
date:   2016-05-20 21:05:54
categories: experiments
description: "Using the Geolocation API and some basic physics to measure how fast an object has moved in a given distance."
dontShow : true
comments: true
---

<form name="startRun">
	<label>Distance: <input type="number" name="distance" required></label>
	<input type="submit" name="submit" value="Run!" disabled="true">
	<input type="button" name="stop" value="Stop" disabled="true">
</form>

<div id="results" style="display:none;">
</div>

<script>
	document.addEventListener('DOMContentLoaded', function(){
		SpeedForce.init();
	});
</script>