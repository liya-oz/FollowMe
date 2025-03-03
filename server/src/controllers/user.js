import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

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
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
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
      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create user, try again later",
    });
  }
};
