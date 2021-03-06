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

exports.listAllTasksOfDay = function(req, res) {
  Task.find({'due_date': {'$eq': req.query.date}}, function(err, tasks) {
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });
}

exports.listAllTasksOfToday = function(req, res) {
  let currentDate = new Date();
  Task.find({'due_date': {'$lte': currentDate.setHours(0,0,0,0)}}, function(err, tasks) {
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });
}

exports.listTaskDetails = function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.addNewTask = function(req, res) {
  let taskToSave = new Task(req.body);
  taskToSave.save(function(err, taskSaved){
    if(err) {
      console.log(err);
    }
    res.status(201).json(taskSaved);
  });
};

exports.updateExistingTask = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, UpdatedTask) {
    if (err) {
      console.log(err);
    }
    res.json(UpdatedTask);
  });
};

exports.deleteExistingTask = function(req, res) {
  Task.findByIdAndRemove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
  });
  res.json({});
};
