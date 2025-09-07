import mongoose from "mongoose";

export const connectDB = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URI); // no need for useNewUrlParser/useUnifiedTopology
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // exit process with failure
  }
};

