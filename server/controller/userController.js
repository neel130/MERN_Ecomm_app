const User = require("../model/userSchema")


// UPDATE USER 
exports.updateUser = async (req,res)=>{
       const {username,email} = req.body
       const id = req.params.id
    try {
      if(!username || !email){
        return res.status(404).json({error:"require all fields"})
      }
      const user = await User.findByIdAndUpdate(id,{
        $set:{
            username,
            email
        }
      },{
        new:true
      })

      return res.status(200).json({success:"updated successful",user})
    } catch (error) {
        console.log("error"+error)
    }
}


// GET SINGLE USER 
exports.getSingleUser = async (req,res)=>{
    const id = req.params.id
    try {
        if(!id){
            return res.status(404).json({error:"require all fields"})
          }
       
          const user = await User.findById(id);
          return res.status(201).json({user})
        
    } catch (error) {
        console.log("error"+error)
    }
}


// GET ALL USERS 
exports.getAllUser = async (req,res)=>{
    try {

          const users = await User.find();
          return res.status(201).json({users})
        
    } catch (error) {
        console.log("error"+error)
    }
}