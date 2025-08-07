import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "👍Registered Successfully👍" });
  } catch (error) {
    res.status(500).json({ error: "Registration Failed" });
  }
};

//Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ error: "Kindly register yourself before logging in" });

    //Compare the Passwords
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword)
      return res.status(400).json({ error: "Invalid Password" });

    //Create token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
