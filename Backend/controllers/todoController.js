const todoModel = require('../models/todoModel');
const mongoose = require('mongoose');


exports.getAllTodos = async(req , res) => {
    try{
        const todos = await todoModel.find({}).sort({createdAt: -1});

        if(!todos || todos.length === 0){
            return res.status(200).json({
                success: false,
                message: "No todos added yet",
                data: []
            })
        }

        res.status(200).json({
            success: true,
            data: todos
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}




exports.getTodoById = async(req , res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid id"
            })
        }

        const todo = await todoModel.findById(id);
        if(!todo){
            return res.status(404).json({
                success: false,
                message: `No todo found with this id ${id}`
            })
        }  
        res.status(200).json({
            success: true,
            data: todo
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })        
    }
}




exports.createTodo = async(req , res)=>{
    try{
        const {title , isCompleted} = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: "Please enter data for add todo"
            })
        }

        const newTodo = await todoModel.create({title});
        res.status(201).json({
            success: true,
            message: "Todo has been added",
            data: newTodo
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}




exports.updateTodoById = async(req , res)=>{
    try{
        const {id} = req.params;
        const {title , isCompleted} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid id"
            })
        }

        const updateTodo = await todoModel.findByIdAndUpdate(
            id,
            {title , isCompleted},
            {
                new: true,
                runValidators: true
            }
        )

        if(!updateTodo){
            return res.status(404).json({
                success: false,
                message: `No todo found with this id ${id}`
            })
        }

        res.status(200).json({
            success: true,
            message: "Todo has been updated",
            data: updateTodo
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}





exports.deleteTodoById = async(req , res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid id"
            })
        }

        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if(!deletedTodo){
            return res.status(404).json({
                success: false,
                message: `No todo found with this id ${id}`
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo has been deleted",
            data: deletedTodo
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}