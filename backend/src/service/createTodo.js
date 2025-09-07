import { todosModel } from "../models/schema.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new todosModel({
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};
