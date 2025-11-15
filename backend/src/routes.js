import express from 'express';
import { fetchData } from './service/fetch.js';
import { syncData } from './service/update.js';
import { signupUser } from './service/signup.js';
import { loginUser } from './service/login.js';
import { authenticationToken } from './service/authenticate.js';
const router=express.Router();


// signup user
router.post('/signup',signupUser);

// login user
router.post('/login',loginUser)
// fetch todos
router.get('/fetch',authenticationToken,fetchData);

 // update todos
router.post('/update',authenticationToken,syncData)



export default router;