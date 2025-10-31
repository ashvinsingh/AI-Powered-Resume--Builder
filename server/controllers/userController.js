
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Resume from "../models/Resume.js";

const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}

//controller for user registration
//Post: /api/users/register


export const registerUser = async (req, res) => {
   try {
     const {name, email, password} = req.body;

     //check if required fields are present
     if(!name || !email || !password){
        return res.status(400).json({message: 'Misiing required fields'})
     }
      // check if user already exist
      const user = await User.findOne({email})
      if(user){
       return res.status(400).json({message: 'user already exists'})
      }

      //create new user
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name, email, password: hashedPassword
      })

      // return succes msg
      const token = generateToken(newUser._id)
      newUser.password = undefined;

      return res.status(201).json({message:"user created successfully", token, User: newUser})

   } catch (error) {
    return res.status(400).json({message: error.message})
   }
}

//controller for user login
//Post: /api/users/login

export const loginUser = async (req, res) => {
   try {
     const { email, password} = req.body;

     
      // check if user already exist
      const user = await User.findOne({email})
      if(!user){
       return res.status(400).json({message: 'Invalid email or password'})
      }
      //check if pass is correct
      if(!user.comparePassword(password)){
        return res.status(400).json({message: 'Invalid email or password'})
      }
      //return succes msg

      const token = generateToken(user._id)
      user.password = undefined;

        return res.status(200).json({message:"login successfully", token, User: user})

   } catch (error) {
    return res.status(400).json({message: error.message})
   }
}

//controller for getting user by id 
//GET: /api/users/data

export const getUserById = async (req, res) => {
   try {
     const userId = req.userId;

     //check if user exist
     const user = await User.findById(userId)
     if(!user){
         return res.status(404).json({message: 'user not found'})
     }
      //return user
      user.password = undefined;

        return res.status(200).json({user})

   } catch (error) {
    return res.status(400).json({message: error.message})
   }
}

//controller fir getting user resume
//GET: /api/users/resumes

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        //return user resume
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
            return res.status(400).json({message: error.message})

    }
}