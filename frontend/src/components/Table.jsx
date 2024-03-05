import {MdOutlineDeleteOutline,MdEditNote,MdOutlineCheckBox,MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
const Table = ({todos,setTodos,isLoading,fetchData}) => {

    const  [editText,setEditText] = useState({
        'body':''
    })

    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`)
            const  newListTodos = todos.filter(todo=>todo.id !== id)
            setTodos(newListTodos)
        }catch(error){
            console.log('eee')
        }
        
    }

    const handleEdit = async(id,value)=>{
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`,value)
            const newTodos = todos.map(todo=>todo.id === id ? response.data :todo)  
            setTodos(newTodos)
        }catch{
            console.log('eee')
        }
    }

    const handleCheckbox= async(id,value)=>{
        handleEdit(id,{
            'completed':!value
        })
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setEditText(prev => ({
          ...prev,
          'body': e.target.value
        }))
        console.log(editText);
      }
  return (
    <div className='py-32' >
        <table className='w-11/12 max-w-4xl ' >
            <thead className='border-b-2 border-black' >
                <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left' >Checkbox</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Todo</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Data Created</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                </tr>
            </thead>
            <tbody>
           {isLoading ? <div>Is Loading</div> : <>
           
                {todos?.map((todoItem,index)=>{
                    return (
 
                <tr key={todoItem.id} className='border-b  border-black'>
                    <td className='p-3'  title={todoItem.id} >
                        <span onClick={()=>handleCheckbox(todoItem.id,todoItem.completed)} className='inline cursor-pointer' >
                        {todoItem.completed ? 
                            <MdOutlineCheckBox /> :  <MdOutlineCheckBoxOutlineBlank />}
                        </span>
                    </td>
                    <td className='p-3 text-sm' >{todoItem.body}</td>
                    <td className='p-3 text-sm text-center' >
                        <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md  ${todoItem.completed ? 'bg-green-300':"bg-red-300"} `} > {todoItem.completed ? 'Done':"Incomplete"}</span>
                    </td>
                    <td className='p-3 text-sm' >{new Date(todoItem.created).toLocaleString()}</td>
                    <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5' >
                        <span className='text-xl cursor-pointer'>
                        <label htmlFor="my-modal" ><MdEditNote onClick={() => setEditText(todoItem)} className=' text-xl cursor-pointer' /></label></span>
                           
                      
                        <span className='text-xl cursor-pointer'>
                            <MdOutlineDeleteOutline onClick={()=>handleDelete(todoItem.id)}/>
                        </span>
                    </td>
                </tr>
                    )
                })}
           </>}

            </tbody>
        </table>

        {/* Modal */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input type="text" value={editText.body} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full mt-8" />
          <div className="modal-action">
            <label htmlFor="my-modal" onClick={()=>handleEdit(editText.id,editText)}  className="btn btn-primary">Edit</label>
            <label htmlFor="my-modal" className="btn">Close</label>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Table