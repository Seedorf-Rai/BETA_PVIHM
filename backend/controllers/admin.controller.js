const { default: mongoose } = require('mongoose');
const Admin = require('../models/admin.model.js')
const Carousel = require('../models/carousel.model.js')
const fs = require('fs')
const path = require('path');
const Welcome = require('../models/Welcome.model.js');
const MsgCEO = require('../models/ceoMessage.model.js');
const Director = require('../models/director.model.js');
const Affiliation = require('../models/affiliation.model.js');
const Courses = require('../models/course.model.js');
const Credit = require('../models/credit.model.js');
const { checkout } = require('../router/admin.routes.js');
const Student = require('../models/student.model.js');
const { log } = require('console');
const Blog = require('../models/blog.model.js');
const Setting = require('../models/setting.model.js');

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

    const {username,password} = req.body;
    if(!username || !password){
    return res.status(401).json({error: "Credentials not completed"})
    }
    console.log('Username:',username);
    console.log('Password:',password);
    const admin = await Admin.findOne({username})
    if(!admin){
      return res.status(401).json({error: "Invalid Email or Password"})
    }
    if(!admin.isPasswordCorrect(password)){
     return res.status(401).json({error: "Invalid Email or Password"})
    }
    const token = await admin.generateAccessToken();
    const newAdmin = await Admin.findById(admin._id).select("-password");
    const options = {
      httpOnly : true,
      secure : true,
      sameSite: 'None',
    };
   return res.status(201).cookie("token",token).json({success : newAdmin,token:token});
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
     res.status(200).clearCookie("token",option).json({message: "Logged out Successfully"})
   }
   catch(err){
      res.status(500).json({message: "Internal Server Error"})
   }
}

module.exports.postSetting = async (req,res)=>{
  try{
   if(!req.file){
    return res.status(400).json({error: "Please upload a file"})
   }
   const s = await Setting.findOne();
   if(s){
    const filePath = path.join(__dirname, '..', req.file.path)
    await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('File deletion error:', err);
                return reject(err);
            }
            resolve();
        });
    });
   return res.status(401).json({message: "Settings already exists"})
   }
   const {address,telephone_number,mobile_number,email,social_media} = req.body
   const localPath = req.file.path
   const setting = await Setting.create({
    logo: localPath,
    address:address,
    telephone_number:telephone_number,
    mobile_number:mobile_number,
    email:email,
    social_media : JSON.parse(social_media)
   })
   res.status(201).json({msg: "Setting successfully posted"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.updateSetting = async(req, res) => {
  try{
   const id = req.params.id
   const {address,telephone_number,mobile_number,email,social_media} = req.body

   const setting = await Setting.findById(id)
   if(!setting){
    return res.status(404).json({message: "Setting not found"})
   }
   var localPath;
   if(req.file){
    const filePath = path.join(__dirname, '..', setting.logo)
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return reject(err);
          }
           localPath = req.file.path
          resolve();
          });
          });
   }
   const newSetting = await Setting.findByIdAndUpdate(id,{
    logo: localPath,
    address:address,
    telephone_number:telephone_number,
    mobile_number:mobile_number,
    email:email,
    social_media : JSON.parse(social_media)
   },{
    new: true
   })
   res.status(200).json({setting: newSetting})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.getSetting = async(req,res)=>{
  try{
   const setting = await Setting.findOne();
   res.status(200).json({setting: setting})
  }
  catch(err){
    console.log(err);
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
module.exports.getCEOMessage = async (req,res)=>{
  try{
   const ceo = await MsgCEO.findOne();
   if(!ceo){
    return res.status(404).json({message: "CEO Message Not Found"})
   }
   else{
    res.status(200).json({ceo: ceo})
   }
  }
  catch(err){
    console.log(err);
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
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('File deletion error:', err);
            return reject(err);
          }
          ceo.image = req.file.path;
          resolve();
        });
      });
     }
     if(message){
      ceo.message = message;
     }
     await ceo.save();
     res.status(200).json({ceo: ceo})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.postDirMsg = async(req,res)=>{
  try{
    const director = await Director.findOne();
    if(director){
      const filePath = path.join(__dirname,'..',req.file.path)
      fs.unlink(filePath,async (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return res.status(500).json({ message: "File deletion error" });
        }
      })
      return res.status(400).json({message: "Director already exists"})
    }
    const {message} = req.body;
    if(!req.file){
     return res.status(400).json({message: "Director photo not uploaded"})
    }
    const localPath = req.file.path;
    const msg = await Director.create({
      message: message,
      image: localPath
    })
    if(!msg){
      res.status(400).json({message: "Could not create message"})
    }
    else{
      res.status(201).json({director: msg})
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.getDirMsg = async (req,res)=>{
  try{
   const director = await Director.findOne();
   if(!director){
    return res.status(404).json({message: "CEO Message Not Found"})
   }
   else{
    res.status(200).json({director: director})
   }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.updateDirMsg = async(req, res) => {
  try{
  const id = req.params.id
  const director = await Director.findById(id)
  if(!director){
    return res.status(404).json({message: "Director message not found"})
    }
    const {message} = req.body
    if(req.file){
      const filePath = path.join(__dirname,'..',director.image)
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('File deletion error:', err);
            return reject(err);
          }
          director.image = req.file.path;
          resolve();
        });
      });
     }
     if(message){
      director.message = message;
     }
     await director.save();
     res.status(200).json({director: director})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.postAffiliation = async(req,res)=>{
  try{
   if(!req.file){
   return res.status(400).json({message: "Affiliation Photo Required"})
   }
   const localPath = req.file.path;
   const {description} = req.body;
   if(!description){
   return res.status(400).json({message: "Affiliation Description Required"})
   }
   const aff = await Affiliation.create({
    image: localPath,
    description : description
   })
   if(!aff){
    return res.status(500).json({message: "Could not add Affiliation"})
   }
   else{
    res.status(201).json({affiliation: aff})
   }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}
module.exports.getAffiliation = async (req, res) => {
  try{
   const aff = await Affiliation.find();
   if(!aff){
    res.status(404).json({msg: "Could not find Affiliation"})
   }
   res.status(200).json({affiliations: aff})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports.updateAffiliation = async (req, res) => {
  try{
    const id = req.params.id
    const aff = await Affiliation.findById(id)
    if(!aff){
      return res.status(404).json({message: "Affiliation not found"})
      }
      const {description} = req.body
      if(req.file){
        const filePath = path.join(__dirname,'..',aff.image)
        await new Promise((resolve, reject) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('File deletion error:', err);
              return reject(err);
            }
            aff.image = req.file.path;
            resolve();
          });
        });
       }
       if(description){
        aff.description = description;
       }
       await aff.save();
       res.status(200).json({Affiliation: aff})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.postCourse = async(req,res)=>{
  try{
   const {title,duration,description,who_must_take,package,benefits_of_learning} = req.body
   if(!req.file){
    return res.status(400).json("Feature photo required");
   }
   const localPath = req.file.path
   const course = await Courses.create({
    title,featured: localPath,duration,description,who_must_take,package,benefits_of_learning
   })
   if(course){
    return res.status(201).json({msg : "Course added successfully"})
   }
   else{
     return res.status(400).json({msg : "Could not add Course"})
   }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}
module.exports.getCourses = async(req,res)=>{
  try{
   const courses = await Courses.find();
   if(courses){
    return res.status(200).json({courses:courses})
   }
   return res.status(404).json({msg: "Courses not found"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg: "Internal Server Error"})
  }
}
module.exports.updateCourse = async(req,res)=>{
  try{
   const id = req.params.id
   const updatedData = req.body
   const getCourse = await Courses.findById(id)
   if(!getCourse){
    return res.status(404).json({msg: "Course not found"})
   }
   if(req.file){
    const filePath = path.join(__dirname,'..',getCourse.featured)
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return reject(err);
        }
        updatedData.featured = req.file.path;
        resolve();
      });
    });
   }
   const course = await Courses.findByIdAndUpdate(id,{
    $set : updatedData
   },{
    new: true
   })
   if(!course){
    return res.status(400).json({message: "Could not update Course"})
  }
  else{
    return res.status(200).json({course : course})
  }
}
  catch(err){
    console.log(err);
    res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.deleteCourse = async(req,res) =>{
 try{
  const id = req.params.id;
  const checkCourse = await Courses.findById(id)
  if(!checkCourse){
    return res.status(404).json({msg: "Course not found"})
  }
  const filePath = path.join(__dirname,'..',checkCourse.featured)
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return reject(err);
        }
        resolve();
      });
    });
  const course = await Courses.findByIdAndDelete(id)
  if(!course){
    return res.status(400).json({message: "Could not delete Course"})
  }
  else{
    return res.status(200).json({message : "Course successfully deleted"})
    }

 }
 catch(err){
  console.log(err);
  res.status(500).json({msg: "Internal Server Error"})
 }
}

module.exports.postCreditTransfers = async (req, res) => {
  try{
   if(!req.file){
    return res.status(400).json({message: "Please upload a file"})
   }
   const localPath = req.file.path;
   const credit = Credit.create({
    featured: localPath
   })
   if(!credit){
    return res.status(400).json({message: "Could not add Credit Transfers"})
   }
   else{
    return res.status(201).json({msg: "Credit Transfer added successfully"})
   }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}
module.exports.getCreditTransfers = async (req, res)=>{
  try{
  const allCredits = await Credit.find();
  if(!allCredits){
    res.status(404).json({msg: "Credit Transfer not found"})
  }
  else{
    res.status(200).json({credits: allCredits})
  }
}
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}
module.exports.deleteCreditTransfers = async (req, res)=>{
  try{
   const id = req.params.id;
   const check = await Credit.findById(id);
   if(!check){
    return res.status(404).json({msg: "Credit Transfer not found"})
   }
   else{
    const filePath = path.join(__dirname,'..',check.featured)
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return reject(err);
        }
        resolve();
      });
    });
    await Credit.findByIdAndDelete(id);
    return res.status(200).json({msg: "Credit Transfer deleted successfully"})
   }
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}

module.exports.postStudent = async(req,res)=>{
  try{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
      return res.status(400).json({msg: "Please enter all fields"})
    }
    const check = await Student.findOne({
      $or : [{username},{email}]
    });
    if(check){
     return  res.status(400).json({msg : "Student Already exists"})
    }
    const student = await Student.create({
      username,
      email,
      password
    })
    const newStudent = await Student.findOne({
      $or : [{username},{email}]
    }).select("-password")
    if(!newStudent){
      return res.status(404).json({msg : "Could not add student"})
    }
    return res.status(201).json({student: newStudent})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}

module.exports.getStudent = async (req,res)=>{
  try{
   const students = await Student.find();
   if(!students){
    return res.status(404).json({msg : "No students found"})
   }
   return res.status(200).json({students: students})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}
module.exports.updateStudent = async (req,res)=>{
  try{
   const id = req.params.id;
   const getStudent = Student.findById(id)
   if(!getStudent){
    return res.status(404).json({msg : "Student not found"})
   }
   const {username , email , password} = req.body;
   const updated = {}
   if(username){updated.username = username}
   if(email){updated.email = email}
   if(password){updated.password = password}
   const student = await Student.findByIdAndUpdate(id,{
    $set : updated
   },{
    new : true
   })
   res.status(200).json({student: student})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}
module.exports.deleteStudent = async (req,res)=>{
  try{
   const id = req.params.id;
   const student = await Student.findById(id);
   if(!student){
    return res.status(404).json({msg : "Student not found"})
   }
   await Student.findByIdAndDelete(id);
   res.status(200).json({msg : "Student deleted successfully"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg : "Internal Server Error"})
  }
}

module.exports.postBlog = async (req,res)=>{
  try{
    const {title,description,readTime} = req.body;
    if(!req.file){
      return res.status(401).json({msg : "Feature photo not provided"})
    }
    const localPath = req.file.path;
    const blog = Blog.create({
      title,
      description,
      readTime,
      featured : localPath,
      created_by_admin : req.user?._id,
      creator_name : "PVIHM"
    })
    if(blog){
      return res.status(201).json({msg : "Blog created successfully"})
    }
    else{
      return res.status(401).json({msg: "Could not upload blogs"})
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}
module.exports.getBlog = async(req,res)=>{
  try{
   const blogs = await Blog.find().sort({ createdAt: -1 });
   return res.status(200).json({blogs: blogs})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}
module.exports.updateBlog = async(req,res)=>{
  try{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(401).json({msg: "Blog not found"})
    }
    const updatedData = req.body;
    if(req.file){
      const filePath = path.join(__dirname, '..', blog.featured)
            await new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('File deletion error:', err);
                        return reject(err);
                    }
                    updatedData.featured = req.file.path;
                    resolve();
                });
            });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id,{
      $set : updatedData
    },{
      new : true
    })
    if(!updatedBlog){
      return res.status(401).json({msg: "Could not update Blog"})
    }
    return res.status(200).json({blog: updatedBlog})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.deleteBlog = async (req,res)=>{
  try{
   const id = req.params.id;
   const blog = await Blog.findById(id);
   if(!blog){
    return res.status(401).json({msg: "Blog not found"})
    }
    const filePath = path.join(__dirname, '..', blog.featured)
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return reject(err);
          }
          resolve();
          });
          });
          await Blog.findByIdAndDelete(id);
          return res.status(200).json({msg: "Blog deleted successfully"})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({msg: "Internal Server Error"})
  }
}