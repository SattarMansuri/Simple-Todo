const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const todo = require('./Routes/todo')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Db connected')).catch((err)=> console.log(err))

app.use(express.json())
app.use(cors())
app.use('/todo', todo)

app.get('/', (req, res)=>{
  res.json({msg: 'This is running perfect'})
})

app.listen(process.env.PORT, (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('Server started')
  }
})