'use strict';

module.exports = function(app, passport) {
	var businessClient = require('../controllers/businessClientController');
	var auth = require('../controllers/authController');
	var xmlController = require('../controllers/xmlController');

	app.route('/login')
		.get(passport.authenticate('basic', { session: false, failureRedirect: "/incorrectLogin" }), auth.login);

	app.route('/incorrectLogin')
		.get(auth.incorrectLogin);

	app.route('/businessClient')
		.get(businessClient.list_all_clients)
		.post(passport.authenticate('basic', { session: false, failureRedirect: "/incorrectLogin" }), businessClient.create_a_client);

	app.route('/businessClient/l')
		.get(businessClient.list_all_clients_limited);

	app.route('/businessClient/where')
		.get(businessClient.filter_clients);

	app.route('/businessClient/l/:clientId(\\d+)')
		.get(businessClient.read_a_client_limited);

	app.route('/businessClient/:clientId(\\d+)')
		.get(businessClient.read_a_client)
		.put(passport.authenticate('basic', { session: false, failureRedirect: "/incorrectLogin" }), businessClient.update_a_client)
		.delete(passport.authenticate('basic', { session: false, failureRedirect: "/incorrectLogin" }), businessClient.delete_a_client);

	app.route('/return/client')
		.put(xmlController.send_xml);

	app.route('/returnCountries')
		.get(xmlController.get_returns);
};
