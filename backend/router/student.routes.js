const router = require('express').Router()
const studentController = require('../controllers/student.controller.js')
const upload = require('../middlewares/multer.middleware.js')
const { StudentAuth } = require('../middlewares/StudentAuth.middleware.js')

router.get('/',StudentAuth,(req,res)=>{
    res.status(200).json({msg: 'This is Student routes'})
})

router.post('/login',studentController.studentLogin)
router.post('/logout',studentController.studentLogout)

router.post('/blog',StudentAuth,upload.single('featured'),studentController.postBlog)
router.get('/blog',StudentAuth,studentController.getBlog)
router.patch('/blog/:id',StudentAuth,upload.single('featured'),studentController.updateBlog)
router.delete('/blog/:id',StudentAuth,studentController.deleteBlog)

module.exports = router