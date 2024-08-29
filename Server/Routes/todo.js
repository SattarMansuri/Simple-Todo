const Todo = require('../modal/Todo')
const express = require('express')
const router = express.Router()

router.post('/add-todos', async (req, res)=>{
  try {
    const {title, description, status} = req.body
    if(!title || !description){
      res.status(500).json({msg: 'please enter Todo Name/Description', success: false})
    }
    const newTodo =  new Todo({title, description, status})
    await newTodo.save()
    res.status(200).json({msg: 'Todo created successfully', success: true})
  } catch (error) {
    console.log(error)
  }
})

router.get('/all-todos', async(req, res)=>{
  try {
    const allTodos = await Todo.find()
    res.status(200).json(allTodos)    
  } catch (error) {
    console.log(error)
  }
})

router.put('/update/:id', async (req, res)=>{
 try {
  const id = req.params.id
  const {title, description} = req.body
  if(!title || !description){
    res.status(500).json({msg: 'Please enter Name/Description', success: false})
  }
  const updateTodo = await Todo.findByIdAndUpdate(id, {title, description}, {
    runValidators: true,
    new: true
  })
  res.status(200).json({msg: 'Task updated successfully', success: true})
 } catch (error) {
  console.log(error)
 }
})

router.delete('/delete/:id', async (req, res)=>{
  try {
    const id = req.params.id
    const data = req.body
    const deletsTodo = await Todo.findByIdAndDelete(id, data)
    res.status(200).json({msg: 'Task deleted successfully', success: true})
   } catch (error) {
    console.log(error)
   }
})

router.put('/status/:id', async(req, res)=>{
  try {
    const id = req.params.id
    const {status} = req.body
    const todo = await Todo.findById(id)
    todo.status = status
    await todo.save()
    res.status(200).json({msg: 'Task completed Successfully', success: true})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router