import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get users, try again later",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: " Please provide user details.",
      });
    }

    const errorList = validateUser(user);
    if (errorList.length > 0) {
      return res.status(400).json({
        success: false,
        msg: validationErrorMessage(errorList),
      });
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email is already in use.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    const userObject = newUser.toObject();
    delete userObject.password;

    res.status(201).json({ success: true, user: userObject });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create user, try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
