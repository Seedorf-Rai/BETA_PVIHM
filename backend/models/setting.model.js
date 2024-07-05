const mongoose = require('mongoose')

const socialMediaSchema = new mongoose.Schema({
    facebook: {
        type : String,
        required : true
    },
    instagram: {
        type : String,
        required : true
        },
    linkedin: {
        type : String,
        required : true
    },
    youtube: {
        type : String,
        required : true
    }
})

const settingSchema = new mongoose.Schema({
    logo : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    telephone_number : {
        type : String,
        required : true
    },
    mobile_number : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    social_media : {
        type : socialMediaSchema,
        required : true
    }
})
const Setting = mongoose.model("setting",settingSchema)
module.exports = Setting