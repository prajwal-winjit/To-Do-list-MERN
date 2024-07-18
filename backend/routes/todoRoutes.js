const express = require('express')
const router = express.Router();
const {addToDo, fetchToDo, deleteToDo, updateTodo} = require('../controller/todoController')


router
    .post('/todo', addToDo)
    .get('/todo', fetchToDo )
    .delete('/todo/:id',deleteToDo)
    .put('/todo/:id', updateTodo)


module.exports = router;