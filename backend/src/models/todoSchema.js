import { Schema, model } from "mongoose";



const todosSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot be more than 100 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"]
    },
    completed: {
      type: String,
      enum: {
        values: ["Y", "N"],
        message: "Completed must be either 'Y' or 'N'"
      },
      default: "N"
    },
    createdDate:{
      type:String,
    },
    'grid-identifier':{
        type:String
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  { timestamps: true }
);

export const Todos = model("Todos", todosSchema);


