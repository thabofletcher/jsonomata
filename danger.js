#!/usr/bin/env node
var http = require('http');
var omata = require('./omata.js');

var parseUrl = function(resource, done) {
	var outstring = '';
	resource.substr(1).split('/').forEach(function(part) {
		outstring += '"' + unescape(part) + '" '
	});
	done(outstring);
};

http.createServer(function  (request, response) {
	var respond = function(responseText, code) {
		response.setHeader("Content-Type", "application/json");
		response.writeHead(code);
	    response.write(responseText);
	    response.end();
	};

	parseUrl(request.url, function(command) {
		omata.call(command, 
			function (stdout) {
				respond(stdout, 200);
			},
			function (error) {
				respond(omata.stringify(error), 500)
			}
			);
	});
}).listen(5150);




