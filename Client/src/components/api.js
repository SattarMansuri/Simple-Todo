import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL


export const createTodo = async ({title, description}) =>{
  try {
    const url = `${backendUrl}/todo/add-todos`
    const response = await axios.post(url, {title, description})
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getAllTodos = async () =>{
try {
  const url = `${backendUrl}/todo/all-todos`
  const response = axios.get(url)
  return response
} catch (error) {
  console.log(error)
}
}

export const updateTodo = async (id, {title, description})=>{
  try {
    const url = `${backendUrl}/todo/update/${id}`
    const response = await axios.put(url, {title, description})
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const deleteTodo = async (id)=>{
  try {
    const url = `${backendUrl}/todo/delete/${id}`
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const completedTask = async (id, status) =>{
  try {
   const  url = `${backendUrl}/todo/status/${id}` 
   const response = await axios.put(url, status)
   return response.data
  } catch (error) {
    console.log(error)
  }
}