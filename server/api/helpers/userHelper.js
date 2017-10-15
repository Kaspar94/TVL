'use strict';

var usersFilePath ='./api/data/users.json';
var encoding = 'utf8';
var fs = require('fs');
var helper = require('./fileHelper');
var bcrypt = require('bcrypt-nodejs');

// Usereid juurde registreerida hetkel ei saa, loetaks ühe korra fail sisse
var usersCollection = require('../data/users.json');

exports.findOneByUsername = function (username, callback) {
  /*
  fs.readFile(usersFilePath, encoding, function (err, data) {
    if (err) callback(err, undefined);
    var usersCollection = JSON.parse(data);
    var user = helper.findOne(usersCollection.data, 'username', username);
    callback(err, user);
  });*/
  var user = helper.findOne(usersCollection.data, 'username', username);
  callback(undefined, user);
}

exports.findOneById = function (id, callback) {
  /*
  fs.readFile(usersFilePath, encoding, function (err, data) {
    if (err) callback(err, undefined);
    var usersCollection = JSON.parse(data);
    var user = helper.findOne(usersCollection.data, 'id', id);
    callback(err, user);
  });*/
  var user = helper.findOne(usersCollection.data, 'id', id);
  callback(undefined, user);
}

exports.validatePassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);;
}
