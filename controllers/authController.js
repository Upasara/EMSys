import User from '../models/User.js'
import jwtWebToken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Employee from '../models/Employee.js'
{/* handles user authentication by validating credentials, generating a JWT and 
    returning it along with user detailss */}
const login = async (req, res) => {
try{

    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
       return res.status(404).json({success:false, error: 'User not found'})
    }    

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
       return res.status(404).json({success:false,  error: 'Password is incorrect'})
    }

    //if the user is an employee, fetch their active status
    if(user.role === 'employee'){
        const employee = await Employee.findOne({userId: user._id}) // query by userId
        if(!employee){
            return res.status(404).json({success:false, error: 'Employee not found'})
        }

        if(!employee.isActive){
            return res.status(403).json({success:false, error: 'Employee is not active'})
        }
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