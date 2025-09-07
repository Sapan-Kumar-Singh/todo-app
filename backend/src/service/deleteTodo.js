import { todosModel } from "../models/schema.js";
export const deleteTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const deletedTodo = await todosModel.findOneAndDelete({ title });
    if (!deletedTodo) {
      return res.status(404).json({
        status: "Failed",
        message: "Todo with given title not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: `Todo '${title}' deleted successfully`,
      data: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete todo",
      error: error.message,
    });
  }
};
