const Product = require("../model/productSchema")

// CREATE PRODUCTS 
exports.createProduct = async (req,res) =>{
    const {name,price,image,description,color,size,category} = req.body
    try {
        if(!name || !price || !image || !description || !category){
            return res.status(404).json({error:"require all fields"})
        }

        const product = await Product.create({
            name,
            price,
            image,
            description,
            color,
            size,
            category
        })

        return res.status(201).json({success:"successful created product",product})
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}



// GET ALL PRODUCTS 
exports.GetallProducts = async (req,res) =>{
      const cat = req.query.category
    try {
        let products;
        if(cat){
           products = await Product.find({category:{
            $in:[cat]
        }});

        }else{
            products = await Product.find();
        }
     if(!products){
        return res.status(400).json({error:"no products found"})
     }
     
     return res.status(200).json({success:"products found successful",products})
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}




// GET SINGLE PRODUCT 
exports.getSingleProduct= async (req,res) =>{
     const productId = req.params.id
    try {
        if(!productId){
            return res.status(404).json({error:"required product_id for getting the product details"});
        }
        
        const product = await Product.findById(productId);
        return res.status(200).json({success:"getting product successful",product});
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}