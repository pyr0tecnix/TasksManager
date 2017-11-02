let task_1 = {'id': 0, 'name': 'Hello world', 'description': 'Foo Bar', 'status': 2, 'due_date': Date.now()};
let task_2 = {'id': 1, 'name': 'Citation', 'description': 'There is no God up there', 'status': 3, 'due_date': Date.now()};
let tasks = [task_1, task_2];

var fs = require('fs');
var bodyParser = require('body-parser');
var TaskController = require('./../data/controller');

var apiRouter = (api) => {

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({extended: false}));

  api.route('/tasks')
    .get(TaskController.listAllTasks)
    .post(TaskController.addNewTask);

  api.route('(/tasks/today)')
    .get(TaskController.listAllTasksOfToday);

  api.route('/tasks/:id')
    .get(TaskController.listTaskDetails)
    .put(TaskController.updateExistingTask)
    .delete(TaskController.deleteExistingTask);
}

module.exports = apiRouter;
