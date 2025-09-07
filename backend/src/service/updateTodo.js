import { todosModel } from "../models/schema.js";
export const updateTodo = async (req, res) => {
  try {
    const { title, description, newTitle } = req.body;
    if (!title) {
      return res.status(400).json({
        status: "Failed",
        message: "Current title is required",
      });
    }

    const updatedTodo = await todosModel.findOneAndUpdate(
      { title },
      { title: newTitle || title, description }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        status: "Failed",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to update todo",
      error: error.message,
    });
  }
};
