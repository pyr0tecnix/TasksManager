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
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.AddNewTask = function(req, res) {
  let taskToSave = new Task(req.body);
  taskToSave.save(function(err, taskSaved){
    if(err) {
      console.log(err);
    }
    res.status(201).json(taskSaved);
  });
};

exports.UpdateExistingTask = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, UpdatedTask) {
    if (err) {
      console.log(err);
    }
    res.json(UpdatedTask);
  });
};
