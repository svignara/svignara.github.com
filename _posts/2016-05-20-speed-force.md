---
layout: post
title:  "Measure Your Speed"
date:   2016-05-20 21:05:54
categories: experiments
description: "Using the Geolocation API and some basic physics to measure how fast an object has moved in a given distance."
dontShow : true
comments: true
---

<style>
	label {
		display: block;
		margin-bottom: 30px;
	}
	.control-buttons {
		height: 100px;
		width: 100px;
	}
</style>
<form name="startRun">
	<label>Get start position: <button type="button" name="startPos" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Get start position</button></label>
	<label>Run: <button type="button" name="run" disabled="true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent control-buttons">Run</button></label>
	<!--<label>Stop: <button type="button" name="stop" disabled="true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent control-buttons">Stop</button></label>-->
</form>

<div id="results" style="display:none;">
</div>

<script>
	document.addEventListener('DOMContentLoaded', function(){
		SpeedForce.init();
	});
</script>