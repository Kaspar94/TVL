var express = require('express'),
  helmet = require('helmet'),
  app = express(),
  port = process.env.PORT || 80,
  bodyParser = require('body-parser'),
  path = require('path'),
  config = require('config'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  User = require('./api/helpers/userHelper');

var dataPath = config.get('dataPath');
User.setDataPath(dataPath);

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

app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var routes = require('./api/routes/routes');
routes(app, passport, dataPath);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

if (config.get("https")) {
  var https = require('https');
  var http = require('http');
  var fs = require('fs');

  var credentialsPaths = config.get('credentials');

  http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);

  https.createServer({
      key: fs.readFileSync(credentialsPaths.privateKeyPath),
      cert: fs.readFileSync(credentialsPaths.certificatePath)
  }, app).listen(443);
  console.log('RESTful API server started on: ' + 443 + "\n" + "Routing " + port + " over to 443");
} else {
  app.listen(port);
  console.log('RESTful API server started on: ' + port);
}

if (config.util.getEnv('NODE_ENV') !== 'production') {
  console.log("Server running in development mode. Set environment value 'NODE_ENV=production' to enable production mode.");
}

module.exports = app;
