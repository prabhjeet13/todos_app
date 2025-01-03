const express = require('express');
const router = express.Router();
const {addTodo,updateTodo,deleteTodoById,getAllTodos,getTodoById} = require('../Controllers/Todos');
const {auth,isAdmin} = require('../Middlewares/Auth');
router.get('/getalltodos',getAllTodos);
router.post('/addtodo',auth,isAdmin,addTodo);
router.post('/updatetodo',auth,isAdmin,updateTodo);
router.post('/deletetodobyid',auth,isAdmin,deleteTodoById);
router.post('/gettodobyid',getTodoById);

module.exports = router;