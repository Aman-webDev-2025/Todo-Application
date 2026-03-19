###                               Backend (Server)

# Project Structure:
    server.js              --> entry point
    db.js                  --> mongodb connection setup
    models/todoModels.js   --> database schema
    routes/todo.js         --> API route
    controller/todoController.js  --> logic for handling requests

# commands used in backend: 
    npm init -y       --> installing package.json file
    npm i express     --> installing express package
    npm i -g nodemon  --> for not killing server again and again
    npm i dotenv      --> for .env file
    npm i mongoose    --> for connecting database
    npm install cors  --> for showing data on frontend
    npm run dev       --> for running server



# API EndePoints:

GET           /todos        -- get all todos
POST          /todos        -- create new todo
GET           /todos/:id    -- get todo by id
DELETE        /todos/:id    -- delete todo by id
PATCH         /todos/:id    -- update todo by id


# Chalange Faced:

* Sorting --> firstly tried to sort data in JavaScript but afterwards learn that in mongoDb is much fast and easy.

* Data Structure --> relize that keeping isCompleted as a default "false" in Schema makes fronted much easier to build