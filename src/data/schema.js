var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  name:  String,
  description: String,
  status:   String,
  due_date: Number
});
