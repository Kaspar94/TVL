'use strict';

module.exports = function(app, passport) {
	var businessClient = require('../controllers/businessClientController');

	app.route('/businessClient')
		.get(businessClient.list_all_clients)
		.post(passport.authenticate('basic', { session: false }), businessClient.create_a_client);

	app.route('/businessClient/where')
		.get(businessClient.filter_clients);

	app.route('/businessClient/:clientId(\\d+)')
		.get(businessClient.read_a_client)
		.put(passport.authenticate('basic', { session: false }), businessClient.update_a_client)
		.delete(passport.authenticate('basic', { session: false }), businessClient.delete_a_client);
};
