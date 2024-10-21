import {ObjectId} from 'mongodb';
import {User} from '../models/index.js';
import { trusted } from 'mongoose';


export const createUser = async (req, res) => {
    try {
        console.log ("API in progress");
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

export const getAllUsers = async (_req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    const {userId} = req.params;
    const updateData = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            {new:true, runValidators:true}
        );
      if(!user){
        return res.status(404).json({message:'User not found'});
      }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
ody;
    try {
        const user = await User.findByIdAndDelete(
            userId,
            {new:true, runValidators:true}
        );
      if(!user){
        return res.status(404).json({message:'User not found'});
      }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



