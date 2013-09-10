(function(){

	var hash = location.hash;

	var urlMapOptions = {};
	
	//check if hash exists, and is a hash with a URLON object string
	if (hash && hash.substr(0,2) === '#_'){
		//remove the # from the hash string, as URLON starts parsing from the underscore
		urlMapOptions = URLON.parse(hash.substr(1, hash.length));
	}

	var map;

	//set map options to properties from url hash if it exists
	var mapOptions = {
		zoom: (urlMapOptions.zoom) ? parseFloat(urlMapOptions.zoom) : 8,
		center: (urlMapOptions.lat && urlMapOptions.long) ? new google.maps.LatLng(parseFloat(urlMapOptions.lat), parseFloat(urlMapOptions.long)) : new google.maps.LatLng(43.7, -79.4),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
})();
