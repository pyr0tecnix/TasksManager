var taskSchema = require('./schema');
var mongoose = require('mongoose');
var Task = mongoose.model('TasksBDD', taskSchema);

exports.listAllTasks = function(req, res) {
  Task.find({}, function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};

exports.listTaskDetails = function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    console.log('Params :', req.params);
    if(err) {
      res.send(err);
      console.log('E : ', err);
    }
    res.json(task);
  });
};
