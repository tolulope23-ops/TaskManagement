const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    role:{
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;