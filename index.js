'use strict';
var http = require('http');
// Required to access local files
var fs = require('fs');

var port = 8080;
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

server.listen(port);
console.log("Server started ! Listening on port " + port);