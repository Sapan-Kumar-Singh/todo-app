import mongoose from "mongoose";

const { Schema ,model} = mongoose;

const todosSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:false},
    completed:{type:Boolean,default:false}
},{ timestamps: true });

export  const todosModel=model('Todos',todosSchema);
