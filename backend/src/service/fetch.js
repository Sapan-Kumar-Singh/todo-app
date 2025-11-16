
import { Todos } from "../models/todoSchema.js";

export const fetchData = async(req, res) => {
    const userId = req.user.id;
  try {
    const todos = await Todos.find({user:userId}).sort({createdAt: -1});
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