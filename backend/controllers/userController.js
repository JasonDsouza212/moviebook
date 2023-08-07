const User =require("../models/userModel")
const jwt= require('jsonwebtoken')
const jwtval = "jasondsouza6uyoshimarioluigipeachbowser"
const createToken = (_id)=>{
    return jwt.sign({_id}, jwtval,{expiresIn:'3d'})
}
// login user
  
const loginUser= async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user= await User.login(email, password)
        const token = createToken(user._id)
        const id = user._id
        res.status(200).json({email,id , token})

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

// signup user 
const signupUser= async(req,res)=>{
    const{email,password}=req.body

    try{
        const user= await User.signup(email, password)
        const token = createToken(user._id)
        const id = user._id
        res.status(200).json({email, id , token})

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports= {
    signupUser,
    loginUser
}