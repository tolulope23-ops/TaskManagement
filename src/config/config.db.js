require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;
const connectDB = async () =>{
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to Database');
    } catch (error) {
        // throw(error);
        console.log(error, 'Error connecting to Database');
    }
}

module.exports = connectDB;