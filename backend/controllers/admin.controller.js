const { default: mongoose } = require('mongoose');
const Admin = require('../models/admin.model.js')
const Carousel = require('../models/carousel.model.js')
const fs = require('fs')
const path = require('path');
const Welcome = require('../models/Welcome.model.js');
const MsgCEO = require('../models/ceoMessage.model.js');

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
module.exports.adminLogout = async function(req,res){
   try{
     const option = {
      httpOnly : true,
      secure : true
     }
     res.status(200).clearCookie("Token:",option).json({message: "Logged out Successfully"})
   }
   catch(err){
      res.status(500).json({message: "Internal Server Error"})
   }
}
module.exports.postCarousel = async (req,res)=>{
   try{
     if(!req.file){
      res.status(400).json({error: "Please upload an image"})
     }
     console.log(req.file);
     const localPath = req.file.path;
     const newCarousel = await Carousel.create({
       image: localPath
     })
     console.log(newCarousel);
     res.status(201).json({message: "Carousel created successfully"})
   }
   catch(err){
      res.status(500).json({message: "Internal Server Error"})
   }
}
module.exports.getCarousel = async (req,res)=>{
   try{
     const carousel = await Carousel.find({}).exec();
     console.log(carousel);
     res.status(200).json({carousel : carousel});
   }
   catch(err){
      res.status(500).json({message: "Internal Server Error"})
   }
}
module.exports.deleteCarousel = async (req,res)=>{
   try {
      const id = req.params.id;

      if (!id) {
        console.log("No id provided");
        return res.status(400).json({ error: "No ID provided" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const carousel = await Carousel.findById(id);

      if (!carousel) {
        return res.status(404).json({ error: "Carousel not found" });
      }

      const filePath = path.join(__dirname, '..', carousel.image);

      // Delete the file from local storage
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return res.status(500).json({ message: "File deletion error" });
        }

        // If the file is deleted successfully, delete the document from the database
        await Carousel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Carousel and associated file deleted successfully" });
      });

    } catch (err) {
      console.error('Internal server error:', err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports.postWelcomeSection = async (req, res) => {
  try{
    const welcomeSection = await Welcome.findOne();
    if(welcomeSection){
      const filePath = path.join(__dirname,'..',req.file.path)
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('File deletion error:', err);
        return res.status(500).json({ message: "File deletion error" });
      }
    });
    return res.status(400).json({ message: "Welcome Already Exists"})
    }
    if(!req.file){
    return  res.status(400).json({ message: "Provide Welcome Image"})
    }
    const {description} = req.body;
    const welcomeImage = req.file.path;
    const welcome = await Welcome.create({
      description: description,
      image: welcomeImage
    })
    if(welcome){
      res.status(201).json({ message: "Welcome Section Created Successfully" })
    }
    else{
      res.status(400).json({ message: "Failed to create Welcome Section" })
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}
module.exports.getWelcomeSection = async(req,res) => {
  try{
   const welcome = await Welcome.find({}).exec();
   if(!welcome){
    res.status(404).json({ message: "Welcome Section Not Found"})
   }
   res.status(200).json({welcome: welcome})
  }
  catch(err){
    res.status(500).json({message: "Internal Server Error"})
  }
}
module.exports.updateWelcomeSection = async(req,res)=>{
  try{
   const id = req.params.id;
   const {description} = req.body;
   const getWelcomeSection = await Welcome.findById(id);
   console.log(getWelcomeSection);
   if(req.file){
    const filePath = path.join(__dirname,'..',getWelcomeSection.image)
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('File deletion error:', err);
        return res.status(500).json({ message: "File deletion error" });
      }
      getWelcomeSection.imgae = req.file.path
    });

   }
   if(description){
    getWelcomeSection.description = description;
   }
   await getWelcomeSection.save();
   res.status(200).json({welcome: getWelcomeSection})
  }
  catch(err){
    res.status(500).json({message: "Internal Server Error"})
  }
}
module.exports.postCEOMessage = async(req,res)=>{
  try{
    const ceo = await MsgCEO.findOne();
    if(ceo){
      const filePath = path.join(__dirname,'..',req.file.path)
      fs.unlink(filePath,async (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return res.status(500).json({ message: "File deletion error" });
        }
        getWelcomeSection.image = req.file.path
      })
      return res.status(400).json({message: "CEO already exists"})
    }
    const {message} = req.body;
    if(!req.file){
     return res.status(400).json({message: "CEO photo not uploaded"})
    }
    const localPath = req.file.path;
    const msg = await MsgCEO.create({
      message: message,
      image: localPath
    })
    if(!msg){
      res.status(400).json({message: "Could not create message"})
    }
    else{
      res.status(201).json({ceo: msg})
    }
  }
  catch(err){
    res.status(500).json({message: "Internal Server Error"})
  }
}
module.exports.updateCEOMessage = async(req, res) => {
  try{
  const id = req.params.id
  const ceo = await MsgCEO.findById(id)
  if(!ceo){
    return res.status(404).json({message: "CEO message not found"})
    }
    const {message} = req.body
    if(req.file){
      const filePath = path.join(__dirname,'..',ceo.image)
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return res.status(500).json({ message: "File deletion error" });
        }
        ceo.image = req.file.path
      });

     }
     if(description){
      ceo.description = description;
     }
     await ceo.save();
     res.status(200).json({ceo: ceo})
  }
  catch(err){
    res.status(500).json({message: "Internal Server Error"})
  }
}