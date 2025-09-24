import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/db.js';
import todoRoutes from './src/routes.js' 
dotenv.config({ path: ".env.local" });

const app=express();
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

 await connectDB();


app.use("/api", todoRoutes);
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})