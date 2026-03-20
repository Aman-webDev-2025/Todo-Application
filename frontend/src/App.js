import './index.css';
import { useEffect , useState } from "react";
import axios from 'axios';
import { TodoProvider } from "./context/TodoContext";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";



function App() {

  const [todos , setTodos] = useState([]);
  const [search , setSearch] = useState('');
  const [error , setError] = useState(null);

  //backend url
  const API_URL = "https://todo-backend-rhky.onrender.com/todos";

  //load todos
  useEffect(() => {
    axios.get(API_URL)
    .then(res => {
      setTodos(res.data.data)
      setError(null);
    })
    .catch(err => setError("Unable to connect with server. Please try again later"))
  }, [])

  //add todo
  const addTodo = async(todoData) => {
    try{
      const response = await axios.post(API_URL , {title: todoData.todo})
      setTodos((prev) => [response.data.data, ...prev])
    }
    catch(err){
      console.log("Add error:" , err);
    }
  }


  //update todo
  const updateTodo = async(id) => {
    const todoToggle = todos.find(todo => todo._id === id);
    try{
      const response = await axios.patch(`${API_URL}/${id}` , {
        isCompleted: !todoToggle.isCompleted
      })
      setTodos((prev) => 
        prev.map((item)=> 
          item._id === id ? response.data.data: item))
    }
    catch(err){
      console.log("Toggle error:" , err)
    }
  }


  //edit todo
  const editTodo = async(id , updateTodo) => {
    try{
      const response = await axios.patch(`${API_URL}/${id}` , {title: updateTodo.todo})
      setTodos((prev) =>
      prev.map((item) => 
      item._id === id ? response.data.data: item))
    }
    catch(err){
      console.log("Edit error:" , err)
    }
  }


  //delete todo
  const deleteTodo = async(id) => {
    try{
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) =>
      prev.filter((item) => 
      item._id !== id))
    }
    catch(err){
      console.log("Delete error:" , err)
    }
  }


  //search todo
  const filteredTodos = (todos || []).filter(todo =>
    todo.title && todo.title.toLowerCase().includes(search.toLowerCase())
  )



  return (
    <TodoProvider value={{todos , addTodo , updateTodo , editTodo , deleteTodo , search , setSearch}}>
      
      <div className="min-h-screen py-8 bg-gray-200">
        {error && <div className='bg-red-200 text-red-700 p-3 rounded-lg mb-4 text-center'>{error}</div>}
        <div className="bg-white w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3">
          <h1 className="text-2xl text-black font-bold text-center mb-9">Manage Your Todos</h1>

          {/* search box */}
          <div className="mb-4">
            <input type="text" 
            placeholder="Search your task..." 
            className="w-full border  rounded-lg px-3 py-2 outline-none text-black"
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            />
          </div>

      
          <div className="mb-4"> <TodoForm/> </div>

          <div className="flex flex-wrap gap-y-3">
            {
              // filteredTodos.map((item) =>(
              //   <div key={item._id} className="w-full">
              //     <TodoItem todo={item} />
              //     </div>
              // ))
              filteredTodos.length>0 ? (
                filteredTodos.map((item) => (
                  <div key={item._id} className='w-full'>
                    <TodoItem todo={item} />
                  </div>
                ))
              ) : (
                <p className='text-center w-full text-black py-4'>No todos found</p>
              )
            }
          </div>

        </div>
      </div>

    </TodoProvider>
  )
}

export default App;
