const Admin = require('../models/admin.model.js')

module.exports.adminRegister = async(req,res)=>{
    try{
      const {username,email,password} = req.body;
      if(!username || !email || !password){
      res.status(401).json({error: "Credentials not completed"})
    }
     const findUser = await Admin.findOne({
        $or : [{username},{email}]
     })
     if(findUser){
        res.status(401).json({error: "Username or Email already exists"})
     }
     const admin = await Admin.create({username: username , email: email , password: password})
     const createdAdmin = await Admin.findOne({
        $or : [{username},{email}]
     }).select("-password")
     if(!createdAdmin){
        res.status(401).json({message: "Could not create Admin"})
     }
     res.status(201).json(createdAdmin)
    }
    catch(err){
        console.log(err);
      res.status(500).json({message: "Internal Server Error"})
    }
}