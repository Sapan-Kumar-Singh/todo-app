import { todosModel } from "../models/schema.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await todosModel.find();
    res.status(200).json({
      status: "Success",
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};
