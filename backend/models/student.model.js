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
    }
})

studentSchema.pre('save',async function(next){
 const student = this
 if(!student.isModified('password')){
   return next();
 }
 student.password = await bcrypt.hash(student.password,10)
 next();
})

studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
studentSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
        id : this._id,
        username : this.username,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

const Student = mongoose.model('Student',studentSchema)
module.exports = Student