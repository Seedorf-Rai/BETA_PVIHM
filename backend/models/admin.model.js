const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
      type: String,
      required: true
    },
    role : {
        type: String,
        default: 'admin'
    }
},{
    timestamps: true
})


adminSchema.pre('save',async function(next){
    const admin = this
    if(!admin.isModified('password')){
       return next();
    }
    admin.password = await bcrypt.hash(admin.password,10)
    next();
})
adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
adminSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
        id : this._id,
        username : this.username,
        email : this.email,
        role : this.role
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin