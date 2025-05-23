import User from '../models/User.js'
import jwtWebToken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
{/* handles user authentication by validating credentials, generating a JWT and 
    returning it along with user detailss */}
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
    res.status(500).json({success:false, error: error.message})
}
}

{/* confirms validity of a token and provides the authenticatied user's info */}
const verify = (req, res) => {
    return res.status(200).json({success:true, user:req.user})
}

export {login, verify} 