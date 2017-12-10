'use strict';

var fs = require('fs');
var helper = require('../helpers/fileHelper');
var encoding = 'utf8';
var clientsFilePath = './api/dataDev/clients.json'; // Initial value, change it in config file.

exports.setDataPath = function (dataPath) {
	clientsFilePath = './api/' + dataPath + 'clients.json';
}

exports.list_all_clients = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		res.json(JSON.parse(data).data);
	});
};

exports.list_all_clients_limited = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var data = JSON.parse(data).data;
		var clients = [];
		for (var i in data) {
			clients.push({
				"id": data[i].id,
				"name": data[i].name,
				"deliveryCountry": data[i].deliveryCountry
			});
		}
		res.json(clients);
	});
};

exports.filter_clients_limited = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var clientCollection = JSON.parse(data);
		var clients = [];
		for (var i in clientCollection.data) {
			clients.push({
				"id": clientCollection.data[i].id,
				"name": clientCollection.data[i].name,
				"deliveryCountry": clientCollection.data[i].deliveryCountry
			});
		}
		clients = helper.filter({fields: ["id", "name", "deliveryCountry"], data: clients}, req.query);
		res.json(clients);
	});
};

exports.filter_clients = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var clientCollection = JSON.parse(data);
		var clients = helper.filter(clientCollection, req.query);
		res.json(clients);
	});
};

exports.create_a_client = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var clientCollection = JSON.parse(data);
		var newClient = helper.create(clientCollection.data, clientCollection.nextId, clientCollection.fields, req.body);
		clientCollection.nextId += 1;

		fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
			if (err) {
				res.status(500).json({'status': 'error', 'cause': 'failed to write to file'});
			} else {
				res.json(newClient);
			}
		});
	});
};

exports.read_a_client = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var client = helper.findOneById(JSON.parse(data).data, req.params.clientId);
		if (client) {
			res.json(client);
		} else { // Id not found
			res.status(404).json({'status': 'error', 'cause': 'id not found'});
		}
	});
};

exports.read_a_client_limited = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var client = helper.findOneById(JSON.parse(data).data, req.params.clientId);
		if (client) {
			res.json({
				"id": client.id,
				"name": client.name,
				"deliveryCountry": client.deliveryCountry
			});
		} else { // Id not found
			res.status(404).json({'status': 'error', 'cause': 'id not found'});
		}
	});
};

exports.update_a_client = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var clientCollection = JSON.parse(data);
		var updatedClient = helper.updateOneById(clientCollection.data, req.params.clientId, req.body);

		if (updatedClient) {
			fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
				if (err) {
					res.status(500).json({'status': 'error', 'cause': 'failed to write to file'});
				} else {
					res.json(updatedClient);
				}
			});
		} else { // Id not found
			res.status(404).json({'status': 'error', 'cause': 'id not found'});
		}
	});
};

exports.delete_a_client = function (req, res) {
	fs.readFile(clientsFilePath, encoding, function (err, data) {
		var clientCollection = JSON.parse(data);
		if (helper.removeOneById(clientCollection.data, req.params.clientId)) {
			fs.writeFile(clientsFilePath, JSON.stringify(clientCollection), encoding, function (err) {
				if (err) {
					res.status(500).json({'status': 'error', 'cause': 'failed to write to file'});
				} else {
					res.json({'status': 'success'});
				}
			});
		} else { // Id not found
			res.status(404).json({'status': 'error', 'cause': 'id not found'});
		}
	});
};
