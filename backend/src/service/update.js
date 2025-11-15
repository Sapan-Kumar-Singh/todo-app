import { Todos } from "../models/todoSchema.js";
import { sendResponse } from "./utils.js";



export const syncData = async (req, res) => {
   
    try {
      const items=req.body.data;
      const userId = req.user.id;

      if(!Array.isArray(items)){
         return sendResponse(res,400,"Invalid data format");
      }

      await Promise.all(
        items.map(async (item)=>{
              const { CRUD, id, ...data } = item;
              switch(CRUD){
                case 'C' :
                  const newItem= new Todos({
                    user:userId,
                    ...data
                  })
                  await newItem.save();
                  break;
              }
        })
      )
      
      return sendResponse(res,201,"Success","data updated successfully");
    } catch (error) {
        if(error.name==="ValidationError"){
          const messages = Object.values(error.errors).map((err) => err.message);
           return sendResponse(res, 400, "Failed", messages);
        }
         return sendResponse(res, 500, "Failed", "Server error");
    }

  if (CRUD === "C") {
    // try {
    //   const newTodo = new Todos({
    //     title,
    //     description,
    //   });
    //   const savedTodo = await newTodo.save();
    //   return sendResponse(res,201,"Success","Todo added successfully",savedTodo);
    // } catch (error) {
    //   if (error.name === "ValidationError") {
    //     const messages = Object.values(error.errors).map((err) => err.message);
    //     return sendResponse(res, 400, "Failed", messages);
    //   }

    //   return sendResponse(res, 500, "Failed", "Server error");
    // }
  } else if (CRUD === "U") {
    // if (!_id) {
    //   return sendResponse(res, 400, "Failed", "Todo ID is required for update");
    // }

    // try {
    //   const updatedFields = {};
    //   if (title !== undefined){
    //       updatedFields.title = title.trim();
    //   }
    //   if (description !== undefined){
    //       updatedFields.description = description.trim();
    //   }
        
    //   if(completed!==undefined){
    //       updatedFields.completed=completed;
    //   }
    //   const updatedTodo = await Todos.findByIdAndUpdate(
    //     _id,
    //     updatedFields,
    //     { new: true, runValidators: true }
    //   );
    //   if (!updatedTodo) {
    //     return sendResponse(res, 400, "Failed", "Todo not found");
    //   }

    //   return sendResponse(res,200,"Success","Todo updated successfully",updatedTodo);
    // } catch (error) {
    //   if (error.name === "ValidationError") {
    //     const messages = Object.values(error.errors).map((err) => err.message);
    //     return sendResponse(res, 400, "Failed", messages);
    //   }
    //   return sendResponse(res, 500, "Failed", "Server error");
    // }
  } else if (CRUD === "D") {
    // if (!_id) {
    //   return sendResponse(res, 400, "Failed", "Todo ID is required for delete");
    // }

    // try {
    //   const deletedTodo = await Todos.findByIdAndDelete(_id);
    //   if (!deletedTodo) {
    //     return sendResponse(res, 404, "Failed", "Todo not found");
    //   }
    //   return sendResponse(res, 200, "Success", "Todo  deleted successfully", deletedTodo);
    // } catch (error) {
    //   return sendResponse(res, 500, "Failed", "Server error");
    // }
  }
};
