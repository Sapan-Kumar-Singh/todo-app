import express from 'express';
import { fetchData } from './service/fetch.js';
import { updateData } from './service/update.js';
import { signupUser } from './service/signup.js';
import { loginUser } from './service/login.js';
const router=express.Router();

// signup user
router.post('/signup',signupUser);

// login user
router.post('/login',loginUser)
// fetch todos
router.get('/fetch',fetchData);

 // update todos
router.post('/update',updateData)



export default router;