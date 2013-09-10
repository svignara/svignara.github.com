(function(){

	var hash = location.hash;

	var urlMapOptions = {};

	if (hash && hash.substr(0,2) === '#_'){
		//console.log(hash);
		urlMapOptions = URLON.parse(hash.substr(1, hash.length));
		//console.log(urlMapOptions);		
	}

	var map;

	var mapOptions = {
		zoom: (urlMapOptions.zoom) ? parseFloat(urlMapOptions.zoom) : 8,
		center: (urlMapOptions.lat && urlMapOptions.long) ? new google.maps.LatLng(parseFloat(urlMapOptions.lat), parseFloat(urlMapOptions.long)) : new google.maps.LatLng(43.7, -79.4),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
})();
