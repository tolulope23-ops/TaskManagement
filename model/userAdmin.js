const mongoose = require('mongoose');

const userAdminSchema = new mongoose.Schema({
    user_Id:{
        type: mongoose.Schema.ObjectId,
        ref: user,
        required: true
    },

    role:{
        type: String
    }
});

const userAdmin = mongoose.model('Admin', userAdminSchema);

module.exports = userAdmin;