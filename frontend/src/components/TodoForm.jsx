import { useState } from "react"
import axios from 'axios'

const TodoForm = ({setTodos,fetchData}) => {

  const [newTodo,setNewTodo] = useState({
    body:''
  })

  const handleChange = (e)=>{
    setNewTodo(prev=>({
      ...prev,
      'body':e.target.value
    }))
    
  }

  const postTodos = async()=>{
    try{
      await axios.post('http://127.0.0.1:8000/api/todo/',newTodo)
      // setTodos(prevTodos=>[...prevTodos,newTodo])
      setNewTodo({
        body:''
      })
      fetchData()
    } catch(error){
      console.log('---->',error)
    }
  }
  return (
    <div>
        <input
        onKeyDown={(e)=>{
          if (e.key === 'Enter'){
            setNewTodo({body:''})
            postTodos()
          }
        }}
        onChange={handleChange} value={newTodo.body} type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
        <button onClick={postTodos} className="btn btn-active btn-primary ml-2">Add To-do</button>
    </div>
  )
}

export default TodoForm