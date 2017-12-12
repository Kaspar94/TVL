'use strict';
var request = require('request');
var fs = require('fs');
var helper = require('../helpers/fileHelper');
var encoding = 'utf8';
var clientsFilePath = './api/data/clients.json'; // Initial value, change it in config file.
var returnsFilePath = './api/data/returnAddresses.json'; // Initial value, change it in config file.
var pwFilePath = './api/data/password.json'; // Initial value, change it in config file.
var randomstring = require("randomstring");
var config = require('config');

exports.setDataPath = function (dataPath) {
	clientsFilePath = './api/' + dataPath + 'clients.json';
	returnsFilePath = './api/' + dataPath + 'returnAddresses.json';
	pwFilePath = './api/' + dataPath + 'password.json';
}

exports.get_returns = function (req, res) {
	fs.readFile(returnsFilePath, encoding, function(err, data) {
		data = JSON.parse(data).data
		var arr = [];
		if (data) {
			for (var i = 0; i<data.length;i++) {
				arr.push(data[i].country);
			}
			res.json(arr);
		} else {
			res.status(500).json({'status': 'error', 'cause': 'unable to read data'});
		}
	});
};

var validateNumber = function (number) {
	if (number) {
		const est = /^(\+)?(372)?(5\d{6,7}|8\d{7})$|^(\+)?(372\s)?(5\d{1}\s\d{2,3}\s\d{3}|8\d{1}\s\d{3}\s\d{3})$/g;
		const lv = /^(\+)?(371)?(2\d{7})$|^(\+)?(371\s)?(2\d{1}\s\d{3}\s\d{3})$/g;
		const lt = /^(\+)?(370)?(6\d{7}|86\d{7})$|^(\+)?(370\s)?(6\d{1}\s\d{3}\s\d{3}|86\s\d{2}\s\d{2}\s\d{3})$/g;
		const mobileTrimmed = trimWhitespace(number);
		// console.log(mobileTrimmed + ' est : ' + est.test(mobileTrimmed));
		// console.log(mobileTrimmed + ' lv : ' + lv.test(mobileTrimmed));
		// console.log(mobileTrimmed + ' lt : ' + lt.test(mobileTrimmed));
		return  mobileTrimmed.match(est) || mobileTrimmed.match(lv) || mobileTrimmed.match(lt);
	}
	return false;
}

var trimWhitespace = function (text) {
		while (text.indexOf(' ') > 1) {
			text = text.replace(' ', '');
		}
		while (text.indexOf('-') > 1) {
			text = text.replace('-', '');
		}
		return text;
};

var validateEmailOrPhone = function (email, number) {
	var isMail = true;
	var isPhone = true;
	if (!email || !email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zäöõüA-ZÄÖÕÜ\-0-9]+\.)+[a-zäöõüA-ZÄÖÕÜ]{2,}))$/g)) {
		isMail = false;
	}
	if (!validateNumber(number)) {
		isPhone = false;
	}
	return isMail || isPhone;
}

exports.send_xml = function (req, res) {
	if (!validateEmailOrPhone(req.body.client_email, req.body.client_number)) {
		res.status(400).json({'status': 'error', 'cause': 'mail or phone wrong or both missing'});
		return;
	} else if (!req.body.client_name || req.body.client_name.length < 2) {
		res.status(400).json({'status': 'error', 'cause': 'name empty or missing'});
		return;
	} else if (!req.body.business_id || ! (typeof req.body.business_id === 'number')) {
		res.status(400).json({'status': 'error', 'cause': 'id not a number or missing'});
		return;
	}

	fs.readFile(clientsFilePath, encoding, function(err, data) {
			var client = helper.findOneById(JSON.parse(data).data, req.body.business_id);
			if (client) {

				fs.readFile(returnsFilePath, encoding, function(err, data) {
					if(err) {
						res.status(500).json({'status': 'error', 'cause': 'could not load storage countries file returnAddresses.json'});
						return;
					}
					var ret = null;
					ret = helper.findOneByCountry(JSON.parse(data).data, client.deliveryCountry);
					if(ret == null) {
						res.status(500).json({'status': 'error', 'cause': 'deliveryCountry ' + client.deliveryCountry + ' not found'});
						return;
					}
					// create XML object
					var obj = {
					   "soapenv:Envelope": {
					      "soapenv:Body": {
						 "xsd:businessToClientMsgRequest": {
						    "partner": client.axapta,
						    "interchange": {
						       "header": {
							  "@sender_cd": client.axapta,
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
								   "@postcode":  ret.postcode,
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
						obj["soapenv:Envelope"]["soapenv:Body"]["xsd:businessToClientMsgRequest"].interchange.item_list.item.add_service['option code="GK"'] = "";
					}
					if(req.body.client_email != null) {
						obj["soapenv:Envelope"]["soapenv:Body"]["xsd:businessToClientMsgRequest"].interchange.item_list.item.add_service['option code="GL"'] = "";
					}

					var builder = require('xmlbuilder');
					var xml = builder.create(obj);

					// send xml to ominva API
					fs.readFile(pwFilePath, encoding, function(err, data) {
						if(err) {
							res.status(500).json({'status': 'error', 'cause': 'could not find API password file'});
							return;
						}
						var pw = JSON.parse(data);

						if(pw != null) {
							if(config.util.getEnv('NODE_ENV') !== 'test') {
								var options = {
									method: 'POST',
									uri: 'https://edixml.post.ee/epmx/services/messagesService/',
									body: xml.toString(),
									headers: {
										'Content-Type': 'text/xml;charset=utf-8',
										'Authorization': 'Basic ' + new Buffer(pw.username+":"+pw.password).toString('base64')
									}
								};
								request(options, function(error, response, body) {
									if(response.statusCode == 200) {
										res.send('{"status" : "success", "response" : "' + body + '"}');
									} else {
										res.send('{"status" : "error", "cause" : "'+error+'"}');
									}

								});
							} else {
								res.send(xml.toString());
							}
						} else {
							res.status(500).json({'status': 'error', 'cause': 'password file data not found'});
						}
					});
				});
			} else { // Id not found
				res.status(500).json({'status': 'error', 'cause': 'id not found'});
			}
	});
};
