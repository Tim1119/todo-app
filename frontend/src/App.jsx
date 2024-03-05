import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import Table from './components/Table'
import './App.css'
import axios from 'axios'

function App() {

  const [todos,setTodos] = useState("")
  const [isLoading,setIsLoading] = useState(true)

  
  

  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async ()=>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/todo')
      setTodos(response.data)
      setIsLoading(false)
     
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='bg-indigo-100 px-8 min-h-screen'  >
      <nav className="pt-8">
        <h1 className="text-5xl text-center pb-8">Todo List</h1>
      </nav>
      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} setTodos={setTodos} isLoading={isLoading} fetchData={fetchData}/>
    </div>
  )
}

export default App
