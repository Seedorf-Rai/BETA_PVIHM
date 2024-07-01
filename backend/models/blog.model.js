const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    featured : {
        type: String,
        required: true
    },
    description : {
     type : String,
     required: true
    },
    readTime : {
        type: String
    },
    created_by_admin : {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Admin',
    },
    creator_name : {
        type: String
    },
    created_by_student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
},
{
    timestamps: true
})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog;