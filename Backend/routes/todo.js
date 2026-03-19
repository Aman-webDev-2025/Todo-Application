const express = require('express');
const router = express();
const {getAllTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    deleteTodoById
} = require('../controllers/todoController')



/**
 * Route: /todos
 * Method: GET
 * Description: get all todos
 * Parameters: NONE
 */
router.get('/' , getAllTodos)


/**
 * Route: /todos/:id
 * Method: GET
 * Description: get todos by id
 * Parameters: id
 */
router.get('/:id' , getTodoById)


/**
 * Route: /todos/
 * Method: POST
 * Description: create new todo
 * Parameters: NONE
 */
router.post('/' , createTodo)


/**
 * Route: /todos/:id
 * Method: PATCH
 * Description: update todo by id
 * Parameters: id
 */
router.patch('/:id' , updateTodoById)


/**
 * Route: /todos/:id
 * Method: DELETE
 * Description: delete todo by id
 * Parameters: id
 */
router.delete('/:id' , deleteTodoById)

module.exports = router;