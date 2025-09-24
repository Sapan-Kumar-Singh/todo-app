import express from 'express';
import { fetchData } from './service/fetch.js';
import { updateData } from './service/update.js';
const router=express.Router();

// fetch todos
router.get('/fetch',fetchData);

// // update todos
 router.post('/update',updateData)



export default router;