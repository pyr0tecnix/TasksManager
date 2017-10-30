let task_1 = {'id': 0, 'name': 'Hello world', 'description': 'Foo Bar', 'status': 2, 'due_date': Date.now()};
let task_2 = {'id': 1, 'name': 'Citation', 'description': 'There is no God up there', 'status': 3, 'due_date': Date.now()};
let tasks = [task_1, task_2];

var fs = require('fs');
var bodyParser = require('body-parser');
var TaskController = require('./../data/controller');

var apiRouter = (api) => {

  api.use(bodyParser.json());

  api.route('/tasks').get(TaskController.listAllTasks);
  api.route('/tasks/:id').get(TaskController.listTaskDetails);
  api.post('/tasks', (req, res) => {
    let obj = {table: []};
    res.setHeader('Content-type', 'application/json');
    if(JSON.stringify(req.body) != {}) {
      fs.appendFile(__dirname + '/../tasks.json', JSON.stringify(req.body), (err) => {
      });
    }
    res.status(201).send();
  });
}

module.exports = apiRouter;
