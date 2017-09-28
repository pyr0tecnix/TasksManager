var http = require('http');

let task = {'id': 0, 'name': 'Hello world', 'status': 2, 'due_date': Date.now()};
var server = http.createServer(function(req, res){
  res.setHeader('content-type', 'application/json')
  res.writeHead(200);
  res.write(JSON.stringify(task));
  res.end();
});

server.listen(8080);

module.exports = server;
