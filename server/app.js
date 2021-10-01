'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('<h1>Here is your home page</h1>');
})
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header ('Access-Control-Allow-Headers', 'Content-Type')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use('/api', require('./routes/api'));

app.listen(3000, function () {
  console.log('The server is listening on http://localhost:3000');
})
