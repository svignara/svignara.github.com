var SpeedForce = (function(){

	'use strict';

	var formEl,
		startPosBtn,
		runBtn,
		stopBtn,
		resultsEl,
		startPos,
		stopPos,
		startTime,
		stopTime,
		totalTime,
		totalDistance,
		avgSpeed;

	Number.prototype.toRadians = function(){
		return this * (Math.PI / 180);
	}

	return {

		init : function(){
			this.initUI();
		},
		initUI : function(){
			var self = this;

			formEl = document.forms.startRun;
			startPosBtn = formEl.startPos;
			runBtn = formEl.run;
			stopBtn = formEl.stop;
			resultsEl = document.getElementById('results');

			self.startPositionListener();
			self.runListener();
			self.stopListener();
		},
		startPositionListener : function(){
			var self = this;

			startPosBtn.addEventListener('click', function(evt){
				if ('geolocation' in navigator) {
				    self.requestUserLocation();
				} else {
				    console.log('can\'t do it :(');
				}
			})
		},
		requestUserLocation :  function(){
			var self = this;

			navigator.geolocation.getCurrentPosition(function(position) {
				startPos = {
					lat : position.coords.latitude,
					lng : position.coords.longitude
				};
				self.displayStartPos();
				self.enableControls();
			});
		},
		displayStartPos : function(){
			var startPosContainer = document.createElement('div');
			startPosContainer.innerHTML = 'Start: (' + startPos.lat + ', ' + startPos.lng + ')';
			resultsEl.appendChild(startPosContainer);
			resultsEl.style.display = 'block';
		},
		enableControls : function(){
			runBtn.disabled = false;
			stopBtn.disabled = false;
		},
		runListener : function(){
			var self = this;

			runBtn.addEventListener('click', function(evt){
				startTime = Date.now();
				console.log('started: ' + startTime);
			});
		},
		stopListener : function(){
			var self = this;

			stopBtn.addEventListener('click', function(evt){
				stopTime = Date.now();
				totalTime = (stopTime - startTime) / 1000;
				navigator.geolocation.getCurrentPosition(function(position){
					stopPos = {
						lat : position.coords.latitude,
						lng : position.coords.longitude
					};
					self.calculateResults();
					self.displayResults();
				});
			});
		},
		calculateResults : function(){
			var R = 6371,
				dLat = (stopPos.lat - startPos.lat).toRadians(),
				dLng = (stopPos.lng - startPos.lng).toRadians();

			if (dLat === 0 && dLng === 0){
				totalDistance = 0;
				avgSpeed = 0;
				return;
			}

			var	lat1 = startPos.lat.toRadians(),
				lat2 = stopPos.lat.toRadians(),
				a = (Math.sin(dLat/2) * Math.sin(dLat/2)) + (Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dLng/2) * Math.sin(dLng/2))),
				c =  2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
				totalDistance = Math.abs((R * c) * 1000),
				avgSpeed = totalDistance / totalTime;
		},
		displayResults : function(){
			var stopPosContainer = document.createElement('div'),
				totalTimeContainer = document.createElement('div'),
				totalDistContainer = document.createElement('div'),
				avgSpeedContainer = document.createElement('div');

			stopPosContainer.innerHTML = 'Stop: (' + startPos.lat + ', ' + startPos.lng + ')';
			totalTimeContainer.innerHTML = 'Time elapsed: ' + totalTime + ' s';
			totalDistContainer.innerHTML = 'Total distance: ' + totalDistance + ' m';
			avgSpeedContainer.innerHTML = 'Average Speed: ' + avgSpeed + ' m/s';

			resultsEl.appendChild(stopPosContainer);
			resultsEl.appendChild(totalTimeContainer);
			resultsEl.appendChild(totalDistContainer);
			resultsEl.appendChild(avgSpeedContainer);
		}

	}

}());
(function(){

	'use strict';

	console.log('js functionality coming very soon...');

})();