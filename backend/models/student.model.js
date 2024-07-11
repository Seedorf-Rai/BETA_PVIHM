const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type: String,
        default: 'student'
    }
})

// studentSchema.pre('save',async function(next){
//  const student = this
//  if(!student.isModified('password')){
//    return next();
//  }
//  student.password = await bcrypt.hash(student.password,10)
//  next();
// })

studentSchema.methods.isPasswordCorrect = async function(password){
    if(password == this.password){
        return true;
    }
    else{
        return false;
    }
}
studentSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
        id : this._id,
        username : this.username,
        email : this.email,
        role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

const Student = mongoose.model('Student',studentSchema)
module.exports = Student