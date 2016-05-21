var SpeedForce = (function(){

	'use strict';

	var formEl,
		distanceEl,
		submitBtn,
		stopBtn,
		resultsEl,
		watchID;

	return {

		init : function(){
			this.initUI();
		},
		initUI : function(){
			var self = this;

			formEl = document.forms.startRun;
			distanceEl = formEl.distance;
			submitBtn = formEl.submit;
			stopBtn = formEl.stop;
			resultsEl = document.getElementById('results');

			if ("geolocation" in navigator){
				self.requestUserLocation();
			} else {
				console.log('geolocation not supported');
			}
		},
		requestUserLocation : function(){
			var self = this;

			navigator.geolocation.getCurrentPosition(function(position) {
				var output = document.createElement('p');
				output.innerHTML = new Date(position.timestamp) + ': (' + position.coords.latitude + ',' + position.coords.longitude + ')';
				resultsEl.appendChild(output);
				self.startRunListener();
			});
		},
		startRunListener :  function(){
			var self = this;

			resultsEl.style.display = 'block';
			submitBtn.disabled = false;

			formEl.addEventListener('submit', function(e){
				e.preventDefault();
				self.trackLocation(distanceEl.value);
			});
		},
		trackLocation : function(distance){
			var self = this;

			watchID = navigator.geolocation.watchPosition(function(position) {
				var output = document.createElement('p');
				output.innerHTML = new Date(position.timestamp) + ': (' + position.coords.latitude + ',' + position.coords.longitude + ')' + ' Speed: ' + position.coords.speed;
				resultsEl.appendChild(output);
				self.stopRunListener();
			});
		},
		stopRunListener : function(){
			var self = this;

			stopBtn.disabled = false;

			stopBtn.addEventListener('click', function(){
				navigator.geolocation.clearWatch(watchID);
				var output = document.createElement('p');
				output.innerHTML = '---Done---';
				resultsEl.appendChild(output);
			});
		}

	}

}());
(function(){

	'use strict';

	console.log('js functionality coming very soon...');

})();