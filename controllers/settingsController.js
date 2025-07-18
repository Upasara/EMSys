import User from "../models/User.js"
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try{
        const {userId, old_password, new_password} = req.body
        
        const user = await User.findById({_id : userId})
        if(!user){
            return res.status(404).json({success :false, error : "User not found"})
        }

        const isMatch = await bcrypt.compare(old_password, user.password)
        if(!isMatch){
            return  res.status(404).json({success : false, error :" Old password is incorrect"}) 
        }

        const hashPassword = await bcrypt.hash(new_password, 10)
        const newUser = await User.findByIdAndUpdate({_id : userId}, {password : hashPassword})

        return res.status(200).json({success : true , message : "Password changed successfully", user : newUser})
    }catch(error){
        return res.status(500).json({success:false, error : "setting error"})
    }
}

export {changePassword}