const mongoose = require('mongoose')

const welcomeSchema = new mongoose.Schema({
    image : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
const Welcome = mongoose.model('Welcome', welcomeSchema)
module.exports = Welcome