var http = require('http');

var express = require('express');
var routes = require('./routes/routes.js');
var api = express();
var mongoose = require('mongoose');
var configMongoDB = require('./data/config');

mongoose.connect(configMongoDB.mongoURI[api.settings.env], {useMongoClient: true}).then(
  () => {
    console.log('Connected to Database: ' + configMongoDB.mongoURI[api.settings.env]);
  },
  err => {
    console.log('Error connecting to the database. ' + err);
  }
);

routes(api);

var server = api.listen(8080, () => {
  console.log("API running on port 8080");
});

module.exports = server;
