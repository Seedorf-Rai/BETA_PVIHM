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
module.exports.adminLogin = async (req,res)=>{
   try{
    const {email,password} = req.body;
    if(!email || !password){
     res.status(401).json({error: "Credentials not completed"})
    }
    const admin = await Admin.findOne({email})
    if(!admin){
      res.status(401).json({error: "Invalid Email or Password"})
    }
    if(!admin.isPasswordCorrect(password)){
      res.status(401).json({error: "Invalid Email or Password"})
    }
    const token = await admin.generateAccessToken();
    const newAdmin = await Admin.findById(admin._id).select("-password");
    const options = {
      httpOnly : true,
      secure : true,
    };
    res.status(201).cookie("Token:",token,options).json({success : newAdmin});
   }
   catch(err){
      res.status(500).json({message: "Internal Server Error"})
   }
}