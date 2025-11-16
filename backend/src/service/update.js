import { Todos } from "../models/todoSchema.js";
import { sendResponse } from "./utils.js";



export const syncData = async (req, res) => {
  try {
    const items = req.body.data;
    const userId = req.user.id;

    if (!Array.isArray(items)) {
      return sendResponse(res, 400, "Invalid data format");
    }

    await Promise.all(
      items.map(async (item) => {
        const { CRUD, _id, ...data } = item;
        switch (CRUD) {
          case "C":
            const newItem = new Todos({
              user: userId,
              ...data,
            });
            await newItem.save();
            break;
          case "U":
            if (!_id) return;
            await Todos.findOneAndUpdate(
              { _id, user: userId }, // secure filter
              { ...data },
              { new: true }
            );
            break;
          case "D":
            if (!_id) return;
            await Todos.findOneAndDelete({ _id, user: userId }); // secure delete
            break;
        }
      })
    );

    return sendResponse(res, 201, "Success", "data updated successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, 400, "Failed", messages);
    }
    return sendResponse(res, 500, "Failed", "Server error");
  }
};
