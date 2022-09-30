const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const ConnectMongoDB = require('./mongodb/connection');
ConnectMongoDB();
const app = express();


// Middleware 
app.use(express.json());

// route import 
const userRoute = require('./routes/UserRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');


// ROUTES
app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running on port"+process.env.PORT)
})