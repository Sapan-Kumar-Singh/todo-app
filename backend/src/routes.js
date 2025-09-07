import express from 'express';
import { createTodo } from './service/createTodo.js';
import { getTodos } from './service/getTodos.js';
import { updateTodo } from './service/updateTodo.js';
import { changeStatus } from './service/status.js';
import { deleteTodo } from './service/deleteTodo.js';

const router=express.Router();

// fetch todos
router.get('/',getTodos);

// add todos
router.post('/create',createTodo)

// edit todos
router.patch("/update",updateTodo);

//changeStatus

router.patch("/status",changeStatus)

// delete todos
router.delete("/delete",deleteTodo);

export default router;