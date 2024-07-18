const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : true
    },
    studentAge : {
        type : String,
        required : true
    },
    studentNumber : {
        type : String,
        required : true
    },
    studentFrom : {
        type : String,
        required : true
    },
    studentCourse : {
        type : String,
        required : true
    },
    studentAddress : {
        type : String,
        required : true
    },
    parentName : {
        type: String,
        required : true
    },
    parentNumber : {
        type : String,
        required : true
        },
})

const Form = mongoose.model('form',formSchema)
module.exports = Form