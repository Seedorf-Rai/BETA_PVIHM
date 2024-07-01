const router = require('express').Router()
const studentController = require('../controllers/student.controller.js')
const { Auth } = require('../middlewares/Auth.middleware.js')

router.get('/',(req,res)=>{
    res.status(200).json({msg: 'This is Student routes'})
})

router.post('/login',studentController.studentLogin)
router.post('/logout',Auth,studentController.studentLogout)

module.exports = router