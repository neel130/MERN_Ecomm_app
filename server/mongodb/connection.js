const mongoose = require('mongoose');

const ConnectMongoDB = () =>{
    mongoose.connect(process.env.MONGO_URI,{
      
            useNewUrlParser: true,
            useUnifiedTopology: true
       
    })

    
    mongoose.connection.once('open', () => {
        console.log("Connected to MongoDB")
    });
    mongoose.connection.on('error', (error) => {
        console.log(`error:${error}`)
    });
}


module.exports = ConnectMongoDB;