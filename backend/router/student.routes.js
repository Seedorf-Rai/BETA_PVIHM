const router = require('express').Router()
const studentController = require('../controllers/student.controller.js')

router.get('/',(req,res)=>{
    res.status(200).json({msg: 'This is Student routes'})
})

router.post('/login',studentController.studentLogin)

module.exports = router