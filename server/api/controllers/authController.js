'use strict';

exports.login = function (req, res) {
  res.json({status: "success", user: {id: req.user.id, username: req.user.username}});
}
