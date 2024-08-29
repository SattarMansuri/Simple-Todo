const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Created',
    enum: ['Created', 'Completed']
  }
})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo