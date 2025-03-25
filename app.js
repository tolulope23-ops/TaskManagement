require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/dbConfig');
const userRoute = require('./routes/userAuth');
const userProfileRoute = require('./routes/userProfile');
const { errorHandlerMiddlware } = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRoute);
app.use('/api/v1/', userProfileRoute);
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

