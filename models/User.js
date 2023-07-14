const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    phone: {
    type: String,
    required: true,
    unique: true
    },
    dob: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    avatar: {
    type: String
    },
    dateOfBirth: {
    type: Date,
    default: Date.now()
    },
    verifyToken: {
    type: String
    },
})
module.exports = mongoose.model('user', userSchema)
