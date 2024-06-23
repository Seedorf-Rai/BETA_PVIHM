const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    image : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Director = mongoose.model('Director',directorSchema)
module.exports = Director