const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Category name required"]
    },
    userId: {
        type: String,
        required: [true, "User Id required"]
    }
})

module.exports = mongoose.model('Category', CategorySchema)