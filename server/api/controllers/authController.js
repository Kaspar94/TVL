'use strict';

exports.login = function (req, res) {
  res.json({status: "success", user: {id: req.user.id, username: req.user.username}});
};

exports.incorrectLogin = function (req, res) {
  res.status(401).json({status: "error", cause: "incorrect username or password"});
}
