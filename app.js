require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Thank you");
});

app.listen(PORT, () => {
    console.log("Server is listening...");
})