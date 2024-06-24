const mongoose = require('mongoose')

const affiliationSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
},{
    timestamps : true
})
const Affiliation = mongoose.model('Affiliation',affiliationSchema)
module.exports = Affiliation