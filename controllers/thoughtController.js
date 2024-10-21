import {ObjectId} from 'mongodb';
import {Thought,User} from '../models/index.js';
import { trusted } from 'mongoose';


export const createThought = async (req, res) => {
    try {
        //first get the user
        const userId = req.body.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        //Create Thought
        const thought = await Thought.create(req.body);

        //Update user with thought 
        user.thoughts.push(thought._id);
       
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

export const getAllThoughts= async (_req, res) => {
    try {
        const thought = await Thought.find();
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getThought = async (req, res) => {
    const {thoughtId} = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if(!thought){
            return res.status(404).json({message:'Thought not found'});
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



