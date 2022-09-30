const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username:{
        type:String,
        require:true
     },
     email:{
        type:String,
        require:true
     },
     password:{
        type:String,
        require:true
     },
     isAdmin:{
        type:Boolean,
        require:true,
        default:false
     }
})

const User = mongoose.model("User",userSchema);

module.exports = User;