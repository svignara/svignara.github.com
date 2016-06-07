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
	.mdl-button {
		margin-bottom: 30px;
	}
	.mdl-button.control-buttons {
		height: 100px;
		width: 100px;
		display: none;
	}
	.mdl-button.control-buttons.show {
		display: block;
	}
</style>
<form name="startRun">
	<button type="button" name="startPos" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Get start position</button>
	<button type="button" name="reset" disabled="true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" disabled="true">Reset</button>
	<button type="button" name="run" disabled="true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent control-buttons">Run</button>
	<button type="button" name="stop" disabled="true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored control-buttons">Stop</button>
</form>

<div id="results" style="display:none;">
</div>

<script>
	document.addEventListener('DOMContentLoaded', function(){
		SpeedForce.init();
	});
</script>