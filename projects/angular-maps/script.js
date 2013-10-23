angular.module('mapsApp', [])
	.controller('MapsCtrl', function ($scope) {

		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(45, -100),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		$scope.cities = [];

		var infoWindow = new google.maps.InfoWindow();

		var createMarker = function (city){
	        
	        var marker = new google.maps.Marker({
	            map: $scope.map,
	            position: new google.maps.LatLng(city.lat, city.long),
	        });
	        marker.name = city.name;
	        marker.team = city.team;
	        	        
	        google.maps.event.addListener(marker, 'click', function(){
	            infoWindow.setContent('<div class="infoWindowContent">' + marker.name + ' - ' + marker.team + '</div>');
	            infoWindow.open($scope.map, marker);
	        });
	        
	        $scope.cities.push(marker);
	        
    	}

    	for (i = 0; i < cities.length; i++){
        	createMarker(cities[i]);
    	}

    	$scope.openInfoWindow = function(e, selectedMarker){
        	e.preventDefault();
        	google.maps.event.trigger(selectedMarker, 'click');
    	}

	});