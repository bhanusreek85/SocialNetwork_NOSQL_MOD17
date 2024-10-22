import { ObjectId } from "mongodb";
import { User } from "../models/index.js";

export const createfriend = async (req, res) => {
  console.log("Adding friend in-progress....");
  try {
    const { userId, friendId } = req.params;
    //validate user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //validate friend
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add friendId to the user's friends array
    user.friends.push(friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log("Error adding friend:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removefriend = async (req, res) => {
  console.log("removing friend in-progress....");
  try {
    const { userId, friendId } = req.params;
    //validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //validate frined
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add friendId to the user's friends array
    user.friends = user.friends.filter(
      (friend) => friend.toString() !== friendId
    );
    await user.save();
    res.json(user);
  } catch (err) {
    console.log("Error removing friend:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
