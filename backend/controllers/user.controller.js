const Affiliation = require("../models/affiliation.model");
const Blog = require("../models/blog.model");
const Carousel = require("../models/carousel.model");
const MsgCEO = require("../models/ceoMessage.model");
const Courses = require("../models/course.model");
const Credit = require("../models/credit.model");
const Director = require("../models/director.model");
const Form = require("../models/form.model");
const Setting = require("../models/setting.model");
const Welcome = require("../models/Welcome.model");

module.exports.setting = async function(req,res){
    try{
     const setting = await Setting.findOne();
     return res.status(200).json({setting:setting})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.getCarousel = async function(req, res){
    try{
     const carousel = await Carousel.find();
     return res.status(200).json({carousels:carousel})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}
module.exports.getWelcome = async function(req, res){
    try{
     const welcome = await Welcome.find();
     return res.status(200).json({welcome: welcome[0]})

    }
    catch(err){
        console.log(err);
        return res.status(500),json({msg: "Internal Server Error"})
    }
}
module.exports.getCourses = async function(req, res){
    try{
    const courses = await Courses.find();
    return res.status(200).json({courses : courses})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}
module.exports.getCEO = async function(req, res){
    try{
     const ceo = await MsgCEO.find();
     return res.status(200).json({ceo: ceo[0]})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.getDirector = async function(req, res){
    try{
      const director = await Director.find();
      return res.status(200).json({director: director[0]})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.getAffiliation = async(req,res)=>{
    try{

        const aff = await Affiliation.find();
        if(!aff){
            return res.status(404).json({msg: "No affiliation found"})
        }
        return res.status(200).json({affiliations: aff})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.getBlogs = async function(req,res){
    try{
     const blogs = await Blog.find();
     if(!blogs){
        return res.status(404).json({msg: "Blogs not Found"});
     }
     return res.status(200).json({blogs: blogs});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.getCreditTransfers = async function(req,res){
    try{

        const creditTransfers = await Credit.find();
        if(!creditTransfers){
            return res.status(404).json({msg: "No credit transfers found"})
            }
            return res.status(200).json({creditTransfers: creditTransfers})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports.postForm = async (req,res)=>{
    try{

        const {studentName , studentAge , studentNumber , studentFrom , studentCourse , studentAddress , parentName , parentNumber} = req.body;
        const newForm = await Form.create({
            studentName , studentAge , studentNumber , studentFrom , studentCourse , studentAddress , parentName, parentNumber
        })
        if(!newForm){
            return res.status(404).json({msg: "Form not created"})
        }
        return res.status(200).json({form : newForm})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}