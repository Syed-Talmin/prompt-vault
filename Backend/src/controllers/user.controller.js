import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPass,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong when registering" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when logging in" });
  }
};

export const updateUserController = async (req, res) => {
  const { username, email, oldPassword, newPassword, bio } = req.body;
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (oldPassword?.trim() === "") {
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Incorrect old password" });
      }
      if (newPassword?.trim().length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters" });
      }
      const hashedPass = await bcrypt.hash(newPassword, 10);
      user.password = hashedPass;
    }
    if (username?.trim() !== "") {
      user.username = username;
    }
    if (email?.trim() !== "") {
      user.email = email;
    }
    if (bio?.trim() !== "") {
      user.bio = bio;
    }
    await user.save();
    user.password = undefined;
    
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong when updating user" });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

export const userController = async (req, res) => {
  const user = req.user;
  const userDetails = await userModel.findOne({ _id: user._id });
  delete userDetails.password;
  return res.status(200).json({ userDetails });
};
