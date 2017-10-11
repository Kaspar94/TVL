'use strict';

var fs = require('fs');
var clientsFilePath = './api/data/clients.json';

exports.list_all_clients = function(req, res) {
	fs.readFile(clientsFilePath, function(err, data) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(data);
		res.end();
	});
};

exports.create_a_client = function(req, res) {
	res.end();
};

exports.read_a_client = function(req, res) {
	fs.readFile(clientsFilePath, function(err, data) {
		var clients = JSON.parse(data);
		var i;
		for (i in clients) {
			if (clients[i].id == req.params.clientId) {
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(clients[i]));
				res.end();
				return; // Id found exit function
			}
		}
		// Id not found
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.write('{"error": "Id not found"}');
		res.end();
	});
};

exports.update_a_client = function(req, res) {
	res.end();
};

exports.delete_a_client = function(req, res) {
	res.end();
};