import { Thought, User } from "../models/index.js";

export const createReaction = async(req,res)=>{
    console.log("Creation of Reaction in-progress....");
try{

}catch (err) {
    console.error("Error creating Reaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }

}

export const removeReaction = async(req,res)=>{
    console.log('Removing Reaction in-progress....');
try{

}catch (err) {
    console.error("Error Removing Reaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}