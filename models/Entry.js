const mongoose = require('mongoose')
const EntrySchema = new mongoose.Schema({

    category: {
        type: String,
        required: [true, "Category name required"]
    },
    userId: {
        type: String,
        required: [true, "User Id required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount required"]
    },
    type: {
        type: String,
        require: [ true, "Entry type required"],
    },

},{timestamps: true})

module.exports = mongoose.model('Entry', EntrySchema)