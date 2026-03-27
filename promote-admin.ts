import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/api/models/user.model";

dotenv.config();

async function promote(email: string) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI missing in .env");

    await mongoose.connect(uri);
    console.log("Connected to DB...");

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("User not found!");
      process.exit(1);
    }

    user.role = "ADMIN" as any;
    await user.save();
    console.log(`Success! ${email} is now an ADMIN.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const emailToPromote = process.argv[2];
if (!emailToPromote) {
  console.log("Usage: npx tsx promote-admin.ts <email>");
  process.exit(1);
}

promote(emailToPromote);
