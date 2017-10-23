var taskSchema = require('./schema');
var mongoose = require('mongoose');
var Task = mongoose.model('Task', taskSchema);

exports.listAllTasks = function(req, res) {
  Task.find({}, function(err, tasks) {
    if (err)
      res.send(err);
    res.json(tasks);
  });
};
