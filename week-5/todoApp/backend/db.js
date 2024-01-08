const mongoose = require("mongoose");
mongoose.connect(import.meta.env.MONGODB_CONNECTION_STRING);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
