'use strict';
module.exports = function(app) {
	var businessClient = require('../controllers/businessClientController');

	app.route('/businessClient')
		.get(businessClient.list_all_clients)
		.post(businessClient.create_a_client);

	app.route('/businessClient/where')
		.get(businessClient.filter_clients);

	app.route('/businessClient/:clientId(\\d+)')
		.get(businessClient.read_a_client)
		.put(businessClient.update_a_client)
		.delete(businessClient.delete_a_client);
};
