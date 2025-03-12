import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    location: { type: String, default: "" },
    contacts: { type: Array, default: [] },
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "password",
    "profilePhoto",
    "location",
    "contacts",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.name || userObject.name.length < 3) {
    errorList.push("Name must be at least 3 characters long.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userObject.email || !emailRegex.test(userObject.email)) {
    errorList.push("Invalid email format.");
  }

  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  if (!userObject.password || userObject.password.length < 8) {
    errorList.push("Password must be at least 8 characters long.");
  } else if (!passwordRegex.test(userObject.password)) {
    errorList.push("Password must contain at least one special character.");
  }

  return errorList;
};

export default User;
