
import { todosModel } from "../models/schema.js";

export const fetchData = async(req, res) => {
    
  try {
    const todos = await todosModel.find().sort({createdAt: -1});
    res.set('Cache-Control', 'no-store');
    res.status(200).json({
      status: "Success",
      message: "Todos fetched successfully",
      Data: todos,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};