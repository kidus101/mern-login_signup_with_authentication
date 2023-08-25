// In this file we will create a connection to our MongoDb database

const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" });

module.exports = () => {
    const connectionParams = {
        useNewUrlParser : true ,
        useUnifiedTopology : true
    };
    console.log("DB_Connection value:", process.env.DB_Connection);

    try{

        mongoose.connect(process.env.MONGO_URI , connectionParams);
        console.log("Connected to MongoDB Atlas")
    }
    catch(err){
        console.log("Failed to Connect to the Database" , err);
    }
}  
