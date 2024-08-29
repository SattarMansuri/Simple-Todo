import React, { useEffect, useState, useRef } from 'react'
import { completedTask, deleteTodo, getAllTodos, updateTodo, createTodo } from './api'
import toast, { Toaster } from 'react-hot-toast';

const Todos = () => {
  const [todoData, setTodoData] = useState([])
  const [updateId, setUpdateId] = useState()
  const [data, setData] = useState({
    title: '',
    description: ''
  })

  const getTodos = async () =>{
  const response = await getAllTodos()
  setTodoData(response.data)
  }
  const deleteHandle = async (id) =>{
    const response = await deleteTodo(id)
    if(response?.success === true){
      toast.success(response.msg)
    }
    setTimeout(()=>{
      getTodos()
    }, 700)
  }
  const completedTodo = async (id, status) =>{
   const response = await completedTask(id, {status})
   if(response?.success === true){
    toast.success(response.msg)
    setTimeout(()=>{
      getTodos()
    }, 700)
  }
  }
  const todoUpdate = async ()=>{
    const response = await updateTodo(updateId, {...data})
    if(response?.success === false){
      toast.error(response.msg)
     }
    if(response?.success === true){
      toast.success(response.msg)
      titleRef.current.value = ""
      descriptionRef.current.value = ""
      setUpdateId('')
      setTimeout(()=>{
        getTodos()
      }, 700)
    } 
  }
  const titleRef = useRef()
  const descriptionRef = useRef()
  const changeHandle = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  const addTodo = async () =>{
  const response = await createTodo({...data})
  if(response?.success === false){
    toast.error(response.msg)
  }
  if(response?.success === true){
    toast.success(response.msg)
    titleRef.current.value = ""
    descriptionRef.current.value = ""
    setTimeout(() => {
      getTodos()
    }, 700);
  }
  }
  useEffect(()=>{
    getTodos()
  },[])
  return (
    <>
    <Toaster/>
    <h1 className='app-title'>My Todos</h1>
      <div className='app-addtodos'>
      <div style={{display: 'flex'}} >
        <div>
        <label className='app-labels' htmlFor="name">Name</label><br />
        <input  onChange={changeHandle} className='app-inputs' type="text" name="title"  ref={titleRef} />
        </div>
        <div>
        <label className='app-labels'   htmlFor="description">Description</label><br />
        <input onChange={changeHandle} className='app-inputs' type="text" name="description" ref={descriptionRef} />
        </div>
      </div>
      {updateId ? <button onClick={todoUpdate} className='app-button'>Update Todo</button> : <button onClick={addTodo} className='app-button'>Add Todo</button>}
      </div>
    <div className='app-todos'>
     <div>{ todoData.length ? 
      <div>{todoData.map((element)=>(
       <div key={element?._id} className='app-eachtodo'>
       <div className='app-left'>
         <h1 className={`${element.status === 'Completed' ? 'app-completedh1' : 'app-h1'}`}>{element.title}</h1>
         <p className={`${element.status === 'Completed' ? 'app-completedp' : 'app-p'}`}>
           {element.description}
         </p>
       </div>
       <div style={{display: 'flex'}}>
         {element.status === 'Created' ? <div> <button onClick={()=>completedTodo(element?._id, 'Completed')} id='complete-btn'>Complete</button>
         <button onClick={()=>{titleRef.current.value = element.title
          descriptionRef.current.value = element.description
          setUpdateId(element?._id)
         }} id='update-btn'>Update</button> </div> : null}
         <button onClick={()=>deleteHandle(element?._id)} id='delete-btn'>Delete</button>
       </div>
     </div>
     ))}  </div> : <h1 className='app-empty'>Please create a todo</h1> }
     </div>
    </div>
    </>
  )
}

export default Todos