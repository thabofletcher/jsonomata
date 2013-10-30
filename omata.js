var sys = require('sys')
var exec = require('child_process').exec;

var arrayify = function (stdstring) {
    var stringarray = stdstring.split('\n');
    return stringarray.slice(0, stringarray.length - 1);
}

exports.stringify = function (data) {
	return JSON.stringify(data, null, "\t")
}

exports.call = function (statement, jsonhandler, errorhandler) {

	jsonhandler = jsonhandler || function(output) {console.log(output);}
	errorhandler = errorhandler || function(output) {exports.stringify(console.log(output));}

	exec(statement, cb);

	function cb(error, stdout, stderr) {
		if (error) {
			if (stderr) {
				error = {
					"error" : error,
					"stderr" : arrayify(stderr)
				}
			}
			errorhandler(error);
		}

		else {
			jsonhandler(exports.stringify(arrayify(stdout)));
		}
	}
}

