import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'


const TodoItem = ({todo}) => {

  const [isTodoEditable , setIsTodoEditable] = useState(false)
  const [todoMsg , setTodoMsg] = useState(todo.title);
  const [error , setError] = useState("");
  const {updateTodo , deleteTodo , editTodo} = useTodo();

  const saveEditTodo = () => {
    if(!todoMsg.trim()){
      return setError("please enter new todo for update")
    }
    editTodo(todo._id , {...todo , todo: todoMsg})
    setIsTodoEditable(false);
    setError("");
  }

  return (
    <>
      <div className={`flex border rounded-lg px-3 py-1.5 gap-x-3 text-black ${todo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
        <input
          type='checkbox'
          className='cursor-pointer'
          checked={todo.isCompleted}
          onChange={() => updateTodo(todo._id)}
        />

        <input
          type='text'
          className={`w-full bg-transparent outline-none
          ${isTodoEditable ? "bg-yellow-100 border-yellow-400" :
          todo.isCompleted ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => {setTodoMsg(e.target.value)
            if(error) setError("");
          }}
          readOnly={!isTodoEditable}
        />

        <button className='inline-flex w-8 h-8 rounded-lg border border-black/10 justify-center item-center bg-gray-50'
        onClick={() => {
          if(todo.isCompleted) return;
          if(isTodoEditable) saveEditTodo();
          else setIsTodoEditable(true);
        }}      
        disabled={todo.isCompleted}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>

        <button 
          className='inline-flex w-8 h-8 rounded-lg border border-black/10 jstify-center item-center bg-gray-50'
          onClick={()=> deleteTodo(todo._id)}
        >
          ❌
        </button>
      </div>

      {/* error */}
      {error && <p className='text-red-500 text-xs mt-1 ml-1 font-semibold'>{error}</p>}
    </>
  )
}

export default TodoItem