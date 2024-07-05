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