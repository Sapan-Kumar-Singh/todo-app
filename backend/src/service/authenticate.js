import jwt from "jsonwebtoken";
import { sendResponse } from "./utils.js";

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export  const authenticationToken=(req,res,next)=>{
    
    const authHeader=req.headers['authorization'];
     
     const token = authHeader && authHeader.split(' ')[1];
      if (token == null) {
            return sendResponse(res, 401, "Authorization token missing. Access denied.");
        }

         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
              return sendResponse(res, 403, "Session expired. Please login again.");  // Invalid token, forbidden
            }
            req.user = user; // Attach user data to the request object
            next(); // Proceed to the next middleware or route handler
        });

}