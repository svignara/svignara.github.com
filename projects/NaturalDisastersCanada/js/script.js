var DisasterMap;

!function ($) {

	DisasterMap = {

		init : function(){
			this.initUI();
		},

		initUI : function(){
			var self = this;
			var searchBtnEl = $('#searchEvents');

			$(function(){				
				self.drawMap();
				//handle click event for search submit button
				searchBtnEl.on('click', function(e){
					e.preventDefault();
					self.submitRequest();
				});
			});
		},

		drawMap : function(){
			//new google maps tiles
			google.maps.visualRefresh = true;
			
			//initiate maps with options
			var mapOptions = {
				center: new google.maps.LatLng(69.25619504213411, -102.14449518750003),
				zoom: 3,
				streetViewControl: false,
				mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE] },
				mapTypeId: google.maps.MapTypeId.TERRAIN
			};
			this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
			
			//declare marker variables for current scope
			this.markers = [];		
			this.markercluster = new MarkerClusterer(this.map);
			this.markercluster.setMaxZoom(10);
			this.oms = new OverlappingMarkerSpiderfier(this.map, {keepSpiderfied: true});
		},

		submitRequest : function(e){
			var self = this;

			var provinceEl = $('#province')
				, disasterEl = $('#disaster')
				, startYrEl = $('#startYear')
				, endYrEl = $('#endYear')
				, province = provinceEl.val()
				, disaster = disasterEl.val()
				, startYr = (startYrEl.val()) ? startYrEl.val() : 1900
				, currDate = new Date()
				, endYr = (endYrEl.val()) ? endYrEl.val() : currDate.getFullYear()
				;
			
			//validate form and populate errors array
			var errors = self.formValidation(disaster, startYr, endYr);

			//if errors exist display the errors and stop further process of submit
			//else, remove the error container if it exists from previous errors
			if (errors.length){				
				self.displayFormErrors(errors);
				return;
			}else{
				var errorContainer = $('.alert.alert-error');
				if (errorContainer.length){
					errorContainer.remove();
				}
			}
			//build the search query url, once all errors (if any) are fixed
			self.buildSearchQuery(province, disaster, startYr, endYr);
		},

		formValidation : function(disaster, start, end){
			var errors = [];
			//build error array, based on conditions of invalid entries for query fields
			if (!disaster){
				errors.push('no disaster selected');
			}
			if (start < 1900){
				errors.push('start year can\'t be less than 1900');
			}
			if (end < 1900){
				errors.push('end year can\'t be less than 1900');
			}
			if (start > end) {
				errors.push('start year can\'t be greater than end');
			}			
			return errors;
		},

		displayFormErrors : function(errors){
			var formEl = $('#queryForm')
				, total = errors.length
				,	errorEl = $('.alert.alert-error ol')
				;

			//if error container element already exists, empty it's contents to display new messages
			//else, create the error container element
			if (errorEl.length){
				errorEl.empty();
			}else{
				formEl.prepend('<div class="alert alert-error">Please fix the following error(s) and re-submit<ol></ol></div>');
				errorEl = $('.alert.alert-error ol');
			}

			//append the errors to the error container
			for (var i = 0; i < total; i++){				
				errorEl.append('<li>' + errors[i] + '</li>');
			}
		},

		buildSearchQuery : function(province, disaster, start, end){
			var self = this;

			var baseQueryString = "http://cdd.publicsafety.gc.ca/CDDService/geojson/EventMapLayer?cultureCode=en-Ca&boundingBox="
				, startDate = start + '0101'
				, endDate  = end + '1231'
				;

			//build query string based on parameters entered in form
			baseQueryString += "&provinces=" + province;
			baseQueryString += "&eventTypes='" + disaster + "'";
			baseQueryString += "&eventStartDate='" + startDate + "','" + endDate + "'";
			
			self.sendRequest(baseQueryString);
		},

		sendRequest : function(url){
			var self = this;

			//create ajax request to node service with the request url for The Canadian Disaster Database
			//Success: clears markers if not first search, and adds markers with returned data and updates events list
			//Error: clears markers if not the first search, updates events list with message for no data
			$.ajax({
				url: 'http://curlwithnode.aws.af.cm/curlRequest',
				data: {"url" : url},
				dataType: 'jsonp',
				jsonpCallback: 'resData',
				success:function(data){ 
					if (self.markers.length){
						self.clearMarkers();
					}
					if (data.features){
						self.addMarkers(data);
						self.updateEventList(data.features);
					}
				},
				error:function(err){					
					if (self.markers.length){
						self.clearMarkers();						
					}
					self.updateEventList();
				}
			});
		},

		addMarkers : function(data){
			
			var total = data.features.length
				, lat
				, lng
				, pos
				, marker
				, infoWindow = new google.maps.InfoWindow({ maxWidth : 250 })
				, content
				, bounds = new google.maps.LatLngBounds()
				;			
			
			for (var i = 0; i < total; i++){
				lat = data.features[i].geometry.coordinates[1];
				lng = data.features[i].geometry.coordinates[0];
				pos = new google.maps.LatLng(lat,lng);				
				
				//create marker on map, add it the bounds object to extend view to markers, push marker to array
				marker = new google.maps.Marker({					
					position:pos,
					map:this.map
				});
				bounds.extend(pos);				
				this.markers.push(marker);				

				//handle infowindow trigger on marker click
				google.maps.event.addListener(this.markers[i], 'click', (function(marker, map, data, i) {
	        return function() {
	        	content = '<p><strong>' + data.features[i].properties.LABEL + '</strong></p><p>Event Start Date: ' + data.features[i].properties.EVENT_START_DATE + '</p>';
	          infoWindow.setContent(content);
	          infoWindow.open(map, marker);
	        }
	      })(this.markers[i], this.map, data, i));
	      //add marker to overlappyingmarkerspiderifier to manage markers with same lat/lng
	      this.oms.addMarker(this.markers[i]);
			}
			//add markers to markerclusterer object
			this.markercluster.addMarkers(this.markers);
			//rescale map to bounds that contain markers			
			this.map.fitBounds(bounds);
			
		},

		updateEventList : function(events){
			var self = this;
			var eventListEl = $('#eventsListContainer');

			scope = angular.element(eventListEl[0]).scope();

			//update angular module's scope object, based on if events data exists or not
			scope.$apply(function() {				
				if (events){
        	scope.events = events;
        	scope.message = null;
      	}else{
      		scope.message = "Sorry no results were found for your query. Quite possible no such event occurred for this region, or something is wrong with the server.";
      		scope.events = [];
      	}
    	});

			if (eventListEl.is(":hidden")){
    		//handles the first visibility state of the event list, after this triggerEl takes care of visibility
    		eventListEl.show().animate({height:'50px'});
    		
    		var triggerDiv = $('#triggerListSlide')
    			, triggerEl = $('#triggerListSlide a')
    			;

    		//bind click event to triggerEl to open/close event list
    		triggerEl.on('click', function(e){
    			e.preventDefault();
    			if (triggerDiv.hasClass('open-state')){
    				triggerDiv.removeClass('open-state').addClass('close-state');
    				eventListEl.animate({height:'500px'});    				
    			}else if(triggerDiv.hasClass('close-state')){
    				triggerDiv.removeClass('close-state').addClass('open-state');    				
    				eventListEl.animate({height:'50px'});
    			}
    		});
    	}
		},

		clearMarkers : function(){
			//remove markers from markerClusterer and OverlappingMarkerSpiderfier objects
			this.markercluster.clearMarkers();
			this.oms.clearMarkers();
			//remove the markers from the map and clear the event handlers binded to the markers
			for (var i = 0; i < this.markers.length; i++ ) {				
				google.maps.event.clearInstanceListeners(this.markers[i]);				
    		this.markers[i].setMap(null);
  		}
  		this.markers = [];  		
		}
	}

	DisasterMap.init();

}(window.jQuery);