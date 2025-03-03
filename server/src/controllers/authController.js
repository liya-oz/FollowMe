import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
