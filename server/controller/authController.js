const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.signup = async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        // checking condition for require all fields 
        if(!username || !email || !password){
            return res.status(404).json({error:"please add all fields"})
        };
        const savedUser = await User.findOne({email});
        if(savedUser){
            return res.status(404).json({error:"user already registered"}) 
        }

        // hashing password 
        const hashedPassword = bcrypt.hashSync(password);

        // creating new user 
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        });
        return res.status(200).json({success:"signup successful",user})
        
    } catch (error) {
        console.log("error"+error)
    }
}



exports.login = async (req,res)=>{
    const {email,password} = req.body;

    try {
        if( !email || !password){
            return res.status(404).json({error:"please add all fields"})
        };
       const user = await User.findOne({email})
       if(!user){
        return res.status(400).json({error:"login faild"})
       } 
       const comparePassword = bcrypt.compareSync(password,user.password);
       if(!comparePassword){
        return res.status(400).json({error:"login faild"})
       } 
       const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SEC_KEY,{expiresIn:"3d"})
       return res.status(201).json({success:"login successful",user,accessToken:token})   
         
    } catch (error) {
        console.log("error"+error)
    }
}