const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, "First name required"]
    },
    lastName: {
        type: String,
        required: [ true, "Last name required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: [ true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [ true, "Password required"]
    }
})

module.exports = mongoose.model('User', UserSchema)