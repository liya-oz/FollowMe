import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
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
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(user)}`,
      });
      return;
    }

    const registrationData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const errorList = validateUser(registrationData);

    if (errorList.length > 0) {
      res.status(400).json({
        success: false,
        msg: validationErrorMessage(errorList),
      });
    } else {
      const newUser = await User.create(registrationData);
      const userObject = newUser.toObject();
      delete userObject.password;

      res.status(201).json({ success: true, user: userObject });
    }
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
    if (!user || user.password !== password) {
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
