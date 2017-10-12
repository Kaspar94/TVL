'use strict';

var fs = require('fs');
var helper = require('../helpers/fileHelper');
var encoding = 'utf8';
var clientsFilePath = './api/data/clients.json';

exports.list_all_clients = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(JSON.parse(data).data));
		res.end();
	});
};

exports.create_a_client = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {
		var clientCollection = JSON.parse(data);
		var newClient = helper.create(clientCollection.data, clientCollection.nextId, clientCollection.fields, req.body);
		clientCollection.nextId += 1;

		fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
			if (err) {
				res.writeHead(500, {'Content-Type': 'application/json'});
				res.write(JSON.stringify({'status': 'error', 'cause': 'failed to write to file'}));
				res.end();
			} else {
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(newClient));
				res.end();
			}
		});
	});
};

exports.read_a_client = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {
		var client = helper.findOneById(JSON.parse(data).data, req.params.clientId);
		if (client) {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(client));
			res.end();
		} else { // Id not found
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.write(JSON.stringify({'status': 'error', 'cause': 'id not found'}));
			res.end();
		}
	});
};

exports.update_a_client = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {
		var clientCollection = JSON.parse(data);
		var updatedClient = helper.updateOneById(clientCollection.data, req.params.clientId, req.body);

		if (updatedClient) {
			fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
				if (err) {
					res.writeHead(500, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({'status': 'error', 'cause': 'failed to write to file'}));
					res.end();
				} else {
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.write(JSON.stringify(updatedClient));
					res.end();
				}
			});
		} else { // Id not found
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.write(JSON.stringify({'status': 'error', 'cause': 'id not found'}));
			res.end();
		}

	});
};

exports.delete_a_client = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {
		var clientCollection = JSON.parse(data);
		if (helper.removeOneById(clientCollection.data, req.params.clientId)) {
			fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
				if (err) {
					res.writeHead(500, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({'status': 'error', 'cause': 'failed to write to file'}));
					res.end();
				} else {
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({'status': 'success'}));
					res.end();
				}
			});
		} else { // Id not found
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.write(JSON.stringify({'status': 'error', 'cause': 'id not found'}));
			res.end();
		}
	});
};
