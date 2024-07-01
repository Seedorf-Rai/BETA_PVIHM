const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    created_by_admin : {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Admin',
    },
    created_by_student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
})