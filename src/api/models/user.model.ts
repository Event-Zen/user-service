import { Schema, model } from "mongoose";

export type Role = "ATTENDEE" | "VENDOR" | "PLANNER" | "ADMIN";
export type UserStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

const userSchema = new Schema(
  {
    role: { type: String, enum: ["ATTENDEE", "VENDOR", "PLANNER", "ADMIN"], required: true },
    status: { type: String, enum: ["ACTIVE", "PENDING", "SUSPENDED"], default: "ACTIVE" },

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    passwordHash: { type: String, required: true },

    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    profileImageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);