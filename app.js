const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./src/routes/userAuth');
const userProfileRoute = require('./src/routes/userProfile');
const taskRoute = require('./src/routes/tasks');

const { errorHandlerMiddlware } = require('./src/middleware/errorHandler');

app.use(cors());
app.use(express.json());
const BASE_URL = '/api/v1';

app.use(`${BASE_URL}/auth`, userRoute);
app.use(`${BASE_URL}/profile`, userProfileRoute);
app.use(`${BASE_URL}/task`, taskRoute);

app.use(errorHandlerMiddlware);

module.exports = app;