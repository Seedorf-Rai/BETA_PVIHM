const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Student = require('../models/student.model');


module.exports.StudentAuth = async(req,res,next)=>{
  try{
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(401).json({msg: "User not logged in"})
    }
   const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   const id = decodedToken.id;
   const role = decodedToken.role;
   if(!role){
    return res.status(401).json({message: "Invalid Token"})
   }
   if(role == 'student'){
     const student = await Student.findById(id).select("-password");
     if(!student){
        return res.status(401).json({message: "Invalid Token"})
        }
        req.user = student
        next();
   }
   else {
    return res.status(401).json({message: "Invalid Token"})
    // const student = await Student.findById(id).select("-password");
    // if(!student){
    //    return res.status(401).json({message: "Invalid Token"})
    //    }
    //    req.user = student
    //    next();
   }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"});
  }
}