let task = {'id': 0, 'name': 'Hello world', 'description': 'Foo Bar', 'status': 2, 'due_date': Date.now()};
let fs = require('fs');
let bodyParser = require('body-parser');


var apiRouter = (api) => {

  api.use(bodyParser.json());

  api.get('/tasks', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
  });
  api.post('/tasks', (req, res) => {
    let obj = {table: []};
    res.setHeader('Content-type', 'application/json');
    if(JSON.stringify(req.body) != {}) {
      console.log(req.body);
      fs.appendFile(__dirname + '/../tasks.json', JSON.stringify(req.body), (err) => {
        console.log(err);
      });
    }
    res.status(201).send();
  });
}

module.exports = apiRouter;
