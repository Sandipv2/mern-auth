import userModel from "../models/user.model.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.json(users);
    } catch(err) {
        return res.json({success: false, message: err.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.body;
        await userModel.deleteOne({_id: userId})
        return res.json({success: true, message: 'User deleted'})
    } catch(err) {
        return res.json({success: false, message: err.message})
    }
}

const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId)

        if(!user) {
            return res.json({success: false, messaga:'User not found'})
        }

        res.json({success: true, userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }})

    } catch(err) {
        return res.json({success: false, message: err.message})
    }
}

export default {getAllUsers, deleteUser, getUserData}