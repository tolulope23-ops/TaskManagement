require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/dbConfig');
const userRoute = require('./routes/userAuth');
const userProfileRoute = require('./routes/userProfile');
const taskRoute = require('./routes/tasks');

const { errorHandlerMiddlware } = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());
const BASE_URL = '/api/v1';

app.use(`${BASE_URL}/auth`, userRoute);
app.use(`${BASE_URL}/profile`, userProfileRoute);
app.use(`${BASE_URL}/task`, taskRoute);

app.use(errorHandlerMiddlware);

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

