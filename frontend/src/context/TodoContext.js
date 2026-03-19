import { createContext , useContext } from "react";

export const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => {},
    updateTodo: (id) => {},
    deleteTodo: (id) => {},
    editTodo: (id , todo) => {},
    search: "",
    setSearch: () => {}
})

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;