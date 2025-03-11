require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/dbConfig');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const server = async(req, res) => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log('Server is listening...');
        })
    } catch (error) {
        console.log(error, 'Error connecting to server');
        
    }
}

server();

