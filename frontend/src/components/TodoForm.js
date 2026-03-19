import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'


const TodoForm = () => {

  const [todo , setTodo] = useState("");
  const [error , setError] = useState("");
  const {addTodo} = useTodo()

  const add = (e) => {
    e.preventDefault();

    if(!todo.trim()) {
      return setError("Please enter todo first");
      
    }

    addTodo({todo: todo.trim()})
    setTodo("")
    setError("")
  }

  return (
    <div>
      <form onSubmit={add} className='flex'>
      <input
        type='text'
        placeholder='Enter Todo..'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none py-1.5 text-black'
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
          if(error) setError("");
        }}
      />

      <button type='submit' className='rounded-r-lg px-3 py-1 bg-green-600 text-white'>Add</button>
    </form>
    {/* error */}
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
}

export default TodoForm