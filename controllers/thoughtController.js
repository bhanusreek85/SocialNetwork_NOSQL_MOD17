import { Thought, User } from "../models/index.js";
import mongoose from "mongoose";

export const createThought = async (req, res) => {
  console.log("Thought creation in-progress.....");
  try {
    // Validate input data
    const { userName, thoughtText } = req.body;
    if (!userName || !thoughtText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user by userName
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create Thought
    const thought = await Thought.create({ thoughtText, userName });

    // Update user with thought
    user.thoughts.push(thought._id);
    await user.save();

    res.json(thought);
  } catch (err) {
    console.error("Error creating thought:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllThoughts = async (_req, res) => {
  console.log("Retriving all thoughts in-progress.....");
  try {
    const thought = await Thought.find();
    res.json(thought);
  } catch (err) {
    console.error("Error getting thoughts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getThought = async (req, res) => {
  console.log("Getting Thought in-progress.....");
  const { thoughtId } = req.params;
  try {
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: "Invalid thought ID" });
    }

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.error("Error getting thought:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateThought = async (req, res) => {
  console.log("Updating thought in-progress....");
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: "Invalid thought ID" });
    }

    //validate if its a valid thought
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    // Update the thought with new data
    thought.thoughtText = thoughtText || thought.thoughtText;

    // Save the updated thought
    const updatedThought = await thought.save();

    // Return the updated thought in the response
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error("Error updating thought:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeThought = async (req, res) => {
  console.log("Deleting thought in-progress....");
  const { thoughtId } = req.params;
  try {
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: "Invalid thought ID" });
    }
    //validate if its a valid thought
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    // Delete the thought
    await Thought.deleteOne({_id:thoughtId});

    // Return the updated thought in the response
    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (err) {
    console.error("Error removing thought:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
