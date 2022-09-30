const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    
    products:{
        type:Array,
        require:true
    },
    userId : {
        type:String,
        require:true
    }
})

const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart ;