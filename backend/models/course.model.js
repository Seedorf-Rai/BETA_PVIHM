const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  featured: {
    type : String,
    required: true
  },
  duration : {
    type: String,
    required : true
  },
  description: {
    type: String,
    required: true
  },
  who_must_take : {
    type: String,
    required: true
  },
  package : {
    type: String,
    required: true
  },
  benefits_of_learning: {
    type: String,
    required: true
  }
},{
    timestamps: true
})

const Courses = mongoose.model("courses",courseSchema)
module.exports = Courses;
