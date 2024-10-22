import { Thought, User } from "../models/index.js";

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
  } catch (error) {
    console.error("Error getting thoughts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getThought = async (req, res) => {
    console.log("Getting Thought in-progress.....");
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (error) {
    console.error("Error getting thought:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
