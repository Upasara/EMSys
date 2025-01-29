import User from '../models/User.js'
import jwtWebToken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const login = async (req, res) => {
try{

    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({success:false, error: 'User not found'})
    }    

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        res.status(404).json({success:false,  error: 'Password is incorrect'})
    }

    const token = jwtWebToken.sign({_id :user._id, role:user.role},
        process.env.JWT_KEY, {expiresIn: '10d'}
    )

    res.status(200).json({success: true, token, user: {_id: user._id, name: user.name, role: user.role}})
}catch(error){
    console.log(error.message)
}
}

export {login} 