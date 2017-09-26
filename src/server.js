var http = require('http');

var server = http.createServer(function(req, res){
  res.setHeader('content-type', 'application/json')
  res.writeHead(200);
  res.write(JSON.stringify({}));
  res.end();
});

server.listen(8080);

module.exports = server;
