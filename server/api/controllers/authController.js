'use strict';

exports.login = function (req, res) {
  res.json({status: "succes", user: {id: req.user.id, username: req.user.username}});
}
