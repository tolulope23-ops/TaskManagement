const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userProfile_Id:{
        type: mongoose.Schema.ObjectId,
        ref: user,
        required: true
    },

    userName: {
        type: String,
    },

    phoneNumber:{
        type: String,
        required: true
    },

    DOB: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum:['active', 'offline'],
        default: 'offline'
    }
})

const userProfile = mongoose.model('profile', userProfileSchema);

module.exports = userProfile;