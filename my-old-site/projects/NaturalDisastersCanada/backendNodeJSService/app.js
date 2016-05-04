var express = require("express")
	, curl = require("curlrequest")
	, app = express()
	;

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

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
		
		/*
		 *Sample Request would look like:
		 *	$.ajax({
		 *			url: 'http://localhost:3000/curlRequest',
		 *			data: {"url" : "yourURL"},
		 *			dataType: 'jsonp',
		 *			jsonpCallback: 'resData',
		 *			success:function(data){ console.log(data); }
		 *	});
		 */
	});

});

app.get('/', function(req, res){
	res.jsonp('Connected');
});

app.listen(3000);