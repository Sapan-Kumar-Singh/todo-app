import { todosModel } from "../models/schema.js";

export const changeStatus = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({
        status: "Failed",
        message: "Title is required",
      });
    }

    const updatedTodo = await todosModel.findOneAndUpdate(
      { title },
      { $set: { completed } }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        status: "Failed",
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating todo",
      error: error.message,
    });
  }
};
