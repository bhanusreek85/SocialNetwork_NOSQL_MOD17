import { Thought, User } from "../models/index.js";
import mongoose from "mongoose";

export const createReaction = async (req, res) => {
  console.log("Creation of Reaction in-progress....");
  try {
    const { thoughtId } = req.params;
    const { reactionBody, userName } = req.body;

    // Validate input data
    if (!reactionBody || !userName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: "Invalid thought ID" });
    }
    // Find the thought by ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    // Create the reaction
    const reaction = {
      reactionBody,
      userName,
      createdAt: new Date(),
    };

    // Add the reaction to the thought's reactions array
    thought.reactions.push(reaction);
    await thought.save();
    res.json(thought);
  } catch (err) {
    console.error("Error creating Reaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeReaction = async (req, res) => {
  console.log("Removing Reaction in-progress....");
  try {
    const { thoughtId,reactionId} = req.params;
    
    // Validate if thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: "Invalid thought ID" });
    }
      // Validate if reactionId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(reactionId)) {
        return res.status(400).json({ message: "Invalid reaction ID" });
      }
    // validate thought by ID
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

     // Validate if the reactionId exists in the thought's reactions array
     const reactionExists = thought.reactions.some(
      (reaction) => reaction._id.toString() === reactionId
    );

    if (!reactionExists) {
      return res.status(404).json({ message: "Reaction not found" });
    }

    // Remove the reaction from the thought's reactions array
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== reactionId
    );
    await thought.save();
    res.json(thought);
  } catch (err) {
    console.error("Error Removing Reaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
