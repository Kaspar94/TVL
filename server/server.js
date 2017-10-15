var express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  bodyParser = require('body-parser'),
  path = require('path'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  User = require('./api/helpers/userHelper');

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOneByUsername(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!User.validatePassword(user, password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var routes = require('./api/routes/routes');
routes(app, passport);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
