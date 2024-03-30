const mongoose = require('mongoose');

const db = 'mongodb://0.0.0.0:27017/carshop';



const connectDB = async () => {
  try {
  await mongoose.connect(db)
  console.log('MongoDB connection established')
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = connectDB;