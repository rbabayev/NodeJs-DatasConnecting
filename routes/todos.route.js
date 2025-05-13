import express from 'express'
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodosByUser } from '../controllers/todos.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();

// GET method
router.get('/', getAllTodos);

router.get('/user', protectRoute, getTodosByUser);

// GET by id method
router.get('/todo/:id', getTodoById);

// POST method
router.post('/add', protectRoute, createTodo);

// PUT method
router.put('/edit/:id', updateTodo);

// DELETE method
router.delete('/delete/:id', protectRoute, checkAdmin, deleteTodo);


export default router