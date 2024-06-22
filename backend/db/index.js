const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async()=>{
  try{
   await mongoose.connect(`${process.env.MONGO_URL}`)
   console.log("Database Connected Successfully".bgCyan.white);
  }
  catch(err){
    console.log("Failed to Connect to MongoDB".blue.bgRed);
  }
}

module.exports = connectDB;