var express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  bodyParser = require('body-parser'),
  path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/github-webhook', (req, res) => {
  res.end();
});

var routes = require('./api/routes/businessClientRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
