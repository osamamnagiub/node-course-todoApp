const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: new Date()
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo
};
