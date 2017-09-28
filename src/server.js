var http = require('http');

var express = require('express');
var routes = require('./routes/routes.js');
var api = express();

routes(api);

var server = api.listen(8080, () => {
  console.log("API running on port 8080");
});

module.exports = server;
