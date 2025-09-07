import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/db.js';
import todoRoutes from './src/routes.js' 
dotenv.config({ path: ".env.local" });

const app=express();
app.use(express.json());

 await connectDB();
// app.get('/',(req,res)=>{
//     res.send('MongoDB connected with Node.js!');
// });

app.use("/api/todos", todoRoutes);
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})