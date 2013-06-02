# Natural Disasters
## A historical map of disasters in Canada
> Note: Data for this application is obtained from [The Canadian Disaster Database](http://www.publicsafety.gc.ca/prg/em/cdd/index-eng.aspx)

###Technologies Behind This App
This application has three main parts to it. 

1. Requesting the data from The Canadian Disaster Database via an AJAX request that's routed through a node service.
2. Display the data on the map via the Google Maps API. (TODO: Allow option to view as Heatmap Layer)
3. Show the data in a list format via AngularJS.

####AJAX and CURL to request Data

	$.ajax({
		url: nodeJSCURLRequestService,
		data: {"url" : RequestUrl},
		dataType: 'jsonp',
		jsonpCallback: 'resData',
		success:function(data){ 
			//do success
		},
		error:function(err){					
			//handle error
		}
	});
	
In the code block above, the Request URL to the Canadian Disaster Database is sent as the data parameter to the Request Service set up in a Node server. This node server then sends a CURL request to the passed Request URL and returns the data back to the domain that performed the AJAX request. Code:

	app.get('/curlRequest', function (req, res) {
	
		var reqURL = req.query.url
			, options = { url: reqURL, include: true }
			;

		curl.request(options, function (err, parts) {
  			parts = parts.split('\r\n');
  			var data = parts.pop();
	      	
	  		res.header('Content-Type', 'application/json');
			res.header('Charset', 'utf-8');
	  		res.send( 'resData(' + data + ');' );
		});
	});
The `curl` object performs the request to the passed URL, and in the callback function passes back the data to the original requester.

####Google Maps API
#####With the help of markerclusterer and overlappingmarkerspiderifier

The data obtained is initiated as markers on the map, but also passed into the markerclusterer object to cluster markers in close bounds together. The markers are also passed into the overlappingmarkerspiderifier object, which handles markers that occur on the same lat/lng (Figure 1).

![overlappingmarkerspiderifier](images/screenshots/overlappingmarkerspiderifier.png "Figure 1")

Figure 1.



