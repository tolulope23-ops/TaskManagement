require('dotenv').config();
const { mongoose } = require('mongoose');
const app = require('./app');
const connectDB = require('./src/config/config.db');

const PORT = process.env.PORT || 3000;

const server = async() => {
    try {
        console.log('Connecting to database..');
        await connectDB();
        app.listen(PORT, () => {
            console.log('Server is listening...');
        });
    } catch (error) {
        console.log(error, 'Error connecting to server');
        await mongoose.disconnect();
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        console.log('Shutting down gracefully...');
        await mongoose.disconnect();
        process.exit(0);
    });
};

server();