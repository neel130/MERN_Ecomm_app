const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:Array,
        require:true
    },
    size:{
        type:String
    },
    color:{
        type:String
    }
},{
    timestamps:true
});


const Product = mongoose.model("Products",productSchema);

module.exports = Product ;