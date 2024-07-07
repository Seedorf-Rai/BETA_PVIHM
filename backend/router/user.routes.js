const router = require('express').Router();
const userController = require('../controllers/user.controller.js')

router.get('/',(req,res)=>{
    res.status(200).json({message: "Welcome"})
})
router.get('/setting',userController.setting)
router.get('/carousel',userController.getCarousel)
router.get('/welcome',userController.getWelcome)
router.get('/courses',userController.getCourses)
module.exports = router