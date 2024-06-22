const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js')

router.get('/',  (req, res)=>{
   res.status(200).json({msg: "Admin"})
})

router.post('/register',adminController.adminRegister)
router.post('/login',adminController.adminLogin)


module.exports = router