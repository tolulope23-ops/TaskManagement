require('dotenv').config();
const mongoose = require('mongoose');

const DBURL = process.env.DBURL;
const connectDB = async () =>{
    try {
        await mongoose.connect(DBURL);
        console.log('Connected to Database');
    } catch (error) {
        console.log(error, 'Error connecting to Database');
    }
}

module.exports = connectDB;