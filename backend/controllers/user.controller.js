const Carousel = require("../models/carousel.model");
const Setting = require("../models/setting.model");

module.exports.setting = async function(req,res){
    try{
     const setting = await Setting.findOne();
     return res.status(200).json({setting:setting})
    }
    catch(err){
        console.log(err);
        return res.status(500),json({msg: "Internal Server Error"})
    }
}

module.exports.getCarousel = async function(req, res){
    try{
     const carousel = await Carousel.find();
     return res.status(200).json({carousels:carousel})
    }
    catch(err){
        console.log(err);
        return res.status(500),json({msg: "Internal Server Error"})
    }
}