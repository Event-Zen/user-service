import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./src/api/models/user.model";

async function check() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user-service");
  const count = await User.countDocuments();
  const users = await User.find().limit(5);
  console.log("User count:", count);
  console.log("Users:", users);
  await mongoose.connection.close();
}

check();
