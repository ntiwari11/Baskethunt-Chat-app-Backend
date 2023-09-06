import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// An unnamed function to conncect the MongoDB
export default async () => {
  return mongoose.connect(process.env.MONGO_URL);
};
