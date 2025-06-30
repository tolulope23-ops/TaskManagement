const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

userSchema.methods.createJWT = async function () {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign(
    {
        id: this.id,
        email: this.email
    },

    JWT_SECRET,
    
    {
        expiresIn: '30d'
    }
)
};

const user = mongoose.model('users', userSchema);

module.exports = user;