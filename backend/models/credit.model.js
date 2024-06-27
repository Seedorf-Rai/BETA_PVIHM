const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    featured : {
        type : String,
        required : true
    }
},{
    timestamps : true
})
const Credit = mongoose.model('credit',creditSchema)
module.exports = Credit