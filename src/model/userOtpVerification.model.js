const mongoose = require('mongoose');

const userOTPSchema = new mongoose.Schema({
    user_Id:{
        type: mongoose.Schema.ObjectId,
        ref:'user',
        required: true
    },

    user_OTP: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAT: {
        type: Date,
        default: Date.now
    },
})

const userOTP = mongoose.model('userOTP', userOTPSchema);

module.exports = userOTP;