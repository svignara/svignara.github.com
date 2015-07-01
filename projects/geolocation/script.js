var geolocation = (function() {

    var isOpen, openInfoWindow;

    return {

        init: function() {

            this.initializeMap();
            this.getHTML5Location();
            this.getGoogleClientLocation();
            this.getFreeGeoIPLocation();
            this.getHostIPLocation();

        },

        initializeMap: function() {

            var mapOptions = {
                center: new google.maps.LatLng(43.740422, -79.405105),
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        },

        createMarker: function(location) {

            var pinColor = location.color;
            var pinImage = new google.maps.MarkerImage("http://dl.dropbox.com/u/65175471/pushpins/" + pinColor + ".png", new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://dl.dropbox.com/u/65175471/pushpins/shadow.png", new google.maps.Size(40, 37), new google.maps.Point(0, 0), new google.maps.Point(12, 35));

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: this.map,
                icon: pinImage,
                shadow: pinShadow
            }),
                contentString = '<div id="' + location.divID + '"><strong>' + location.title + '</strong><br>Estimated City: ' + location.city + '<br>Estimated LatLng: ' + location.lat + ', ' + location.lng + '</div>';

            marker.infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
                if (isOpen) {
                    openInfoWindow.close();
                    if (openInfoWindow == marker.infoWindow) {
                        isOpen = false;
                    } else {
                        marker.infoWindow.open(this.map, marker);
                        openInfoWindow = marker.infoWindow;
                        isOpen = true;
                    }
                } else {
                    marker.infoWindow.open(this.map, marker);
                    openInfoWindow = marker.infoWindow;
                    isOpen = true;
                }
            });

            if (!this.map.getBounds().contains(marker.getPosition())) {
                this.map.setCenter(marker.getPosition());
            }

        },

        getHTML5Location: function() {

            var self = geolocation;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.geocodeHTML5Location, function(data) {
                    self.printError('HTML5 Geolocation API', "you've denied Geolocation detection in your browser settings");
                });
            } else {
                self.printError('HTML5 Geolocation API', "you're browser doesn't support HTML5 Geolocation detection");
            }

        },

        geocodeHTML5Location: function(loc) {

            var self = geolocation,
                currentLocation;

            self.HTML5Location = {
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            };

            self.geocoder = new google.maps.Geocoder();

            currentLocation = new google.maps.LatLng(self.HTML5Location.lat, self.HTML5Location.lng);

            self.geocoder.geocode({
                'latLng': currentLocation
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.HTML5Location.city = results[2].formatted_address;
                    self.HTML5Location.title = 'HTML5 Geolocation API';
                    self.HTML5Location.color = 'blue';
                    self.GoogleClientLocation.divID = 'results1';
                    self.createMarker(self.HTML5Location);
                }
            });

        },

        getGoogleClientLocation: function() {

            var self = geolocation;

            $.ajax({
                url: '//www.google.com/jsapi',
                dataType: "script",
                success: function() {
                    var location = google.loader.ClientLocation;
                    if (location) {
                        self.GoogleClientLocation = {
                            lat: location.latitude,
                            lng: location.longitude
                        };
                        self.GoogleClientLocation.city = location.address.city;
                        self.GoogleClientLocation.title = 'Google Loader Client Location API';
                        self.GoogleClientLocation.color = 'green';
                        self.GoogleClientLocation.divID = 'results2';
                        self.createMarker(self.GoogleClientLocation);
                    } else {
                        self.printError('Google Loader Client Location API', "you're location is not in Google's Client Location services database");
                    }
                },
                error: function() {
                    self.printError('Google Loader Client Location API', "Google's Client Location API service is down at the moment");
                }
            });

        },

        getFreeGeoIPLocation: function() {

            var self = geolocation;

            $.ajax({
                url: 'http://freegeoip.net/json/',
                dataType: 'jsonp',
                cache: true,
                jsonp: 'callback',
                success: function(data) {
                    if (data.latitude && data.longitude) {
                        self.freeGeoIPLocation = {
                            lat: data.latitude,
                            lng: data.longitude
                        };
                        self.freeGeoIPLocation.city = data.city;
                        self.freeGeoIPLocation.title = 'FreeGeoIP Service';
                        self.freeGeoIPLocation.color = 'red';
                        self.freeGeoIPLocation.divID = 'results3';
                        self.createMarker(self.freeGeoIPLocation);
                    } else {
                        self.printError('FreeGeoIP Service', "you're location is not in the FreeGeoIP database");
                    }
                },
                error: function() {
                    self.printError('FreeGeoIP Service', "FreeGeoIP service is down at the moment");
                }
            });

        },

        getHostIPLocation: function() {

            var self = geolocation;

            $.ajax({
                url: 'http://api.hostip.info/get_json.php?position=true',
                dataType: 'html',
                success: function(data) {
                    var pos = $.parseJSON(data);
                    if (pos.lat && pos.lng) {
                        self.HostIPLocation = {
                            lat: pos.lat,
                            lng: pos.lng
                        };
                        self.HostIPLocation.city = pos.city;
                        self.HostIPLocation.title = 'HostIP.info Service';
                        self.HostIPLocation.color = 'yellow';
                        self.HostIPLocation.divID = 'results4';
                        self.createMarker(self.HostIPLocation);
                    } else {
                        self.printError('HostIP.info Service', "you're IP could not be queried in the database");
                    }
                },
                error: function() {
                    self.printError('HostIP.info Service', "HostIP.info's service is down at the moment");
                }
            });

        },

        printError: function(geolocationMethod, reason) {

            var errorContainer = $('#errorMessages');
            var msg = '<li><b>' + geolocationMethod + '</b> is unavailable<br><b>Reason:</b> ' + reason + '.</li>';

            if (errorContainer.hasClass('hidden')) {
                errorContainer.removeClass('hidden');
                errorContainer.addClass('show');
            }

            $('#errorMessages ol').append(msg);

        }

    };

}());

$(document).ready(function() {

    geolocation.init();

})