'use strict';
var fs = require('fs');
var helper = require('../helpers/fileHelper');
var encoding = 'utf8';
var clientsFilePath = './api/data/clients.json';
var returnsFilePath = './api/data/returnAddresses.json';
var randomstring = require("randomstring");

exports.get_returns = function(req, res) {
	fs.readFile(returnsFilePath, encoding, function(err, data) {
		data = JSON.parse(data).data
		var arr = [];
		if (data) {
			for (var i = 0; i<data.length;i++) {
				arr.push(data[i].country);	
			}
			res.json(arr);
		} else { // Id not found
			res.status(404).json({'status': 'error', 'cause': 'unable to read data'});
		}
	});
};

exports.send_xml = function(req, res) {
	fs.readFile(clientsFilePath, encoding, function(err, data) {			
			var client = helper.findOneById(JSON.parse(data).data, req.body.business_id);
			if (client) {
				console.log(client.deliveryCountry);
				fs.readFile(returnsFilePath, encoding, function(err, data) {
					if(err) {
						throw err;
					}
					var ret = null;
					ret = helper.findOneByCountry(JSON.parse(data).data, client.deliveryCountry);
					if(ret == null) {
						res.status(404).json({'status': 'error', 'cause': 'deliveryCountry ' + client.deliveryCountry + ' not found'});
						return;
					}
					var obj = {
					   "Envelope": {
					      "Body": {
						 "businessToClientMsgRequest": {
						    "partner": "24510",
						    "interchange": {
						       "header": {
							  "@sender_cd": "24510",
							  "@file_id" : randomstring.generate(14)
								
						       },
						       "item_list": {
							  "item": {
							     "add_service": {
							     },
							     "measures": {
								"@weight": "1"
							     },
							     "receiverAddressee": {
								"person_name": client.name,
								"address": {
								   "@postcode": client.postIndex,
								   "@deliverypoint": client.city,
								   "@country": client.country,
								   "@street": client.street
								}
							     },
							     "returnAddressee": {
								"person_name": req.body.client_name,
								"mobile": req.body.client_number,
								"email": req.body.client_email,
								"address": {
								   "@postcode": ret.postcode,
								   "@deliverypoint": ret.deliverypoint,
								   "@country": ret.country,
								   "@street": ret.street
								}
							     },
							     "@service": client.serviceNumber
							  }
						       },
						       "@msg_type": "elsinfov1"
						    }
						 }
					      },
					      "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
					      "@xmlns:xsd": "http://service.core.epmx.application.eestipost.ee/xsd"
					   }
					}
					if(req.body.client_number != null) {
						obj.Envelope.Body.businessToClientMsgRequest.interchange.item_list.item.add_service['option code="GN"'] = "";
					}
					if(req.body.client_email != null) {
						obj.Envelope.Body.businessToClientMsgRequest.interchange.item_list.item.add_service['option code="GM"'] = "";
					}

					var builder = require('xmlbuilder');
					var xml = builder.create(obj);
					res.send(xml.toString());
				});
			} else { // Id not found
				res.status(404).json({'status': 'error', 'cause': 'id not found'});
			}
	});
};
