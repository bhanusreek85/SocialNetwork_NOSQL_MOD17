import { ObjectId } from "mongodb";
import { User,Thought } from "../models/index.js";
import { trusted } from "mongoose";

export const createUser = async (req, res) => {
  console.log("User Creation in-progress...");
  try {
    // Validate input data
    const { userName, email } = req.body;
    if (!userName || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.create({ userName, email });
    res.json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (_req, res) => {
  console.log("Getting all users in-progress...");
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  console.log("Getting all user in-progress...");
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  console.log("Updating user in-progress...");
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  console.log("deleting user in-progress...");
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User and associated thoughts deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
