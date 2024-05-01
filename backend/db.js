const mongoose =require('mongoose');

const connectToMongo =async() =>{
    mongoose.connect(process.env.mongoURI);
    console.log("connected to mongoose");
}

module.exports = connectToMongo;