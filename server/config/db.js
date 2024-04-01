const mongoose = require('mongoose');

const db = "mongodb+srv://etolebradone:lovingson23@cluster0.pjipfgw.mongodb.net/carsells";



const connectDB = async () => {
  try {
  await mongoose.connect(db)
  console.log('MongoDB connection established')
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = connectDB;