const router = require('express').Router()
const studentController = require('../controllers/student.controller.js')
const { Auth } = require('../middlewares/Auth.middleware.js')
const upload = require('../middlewares/multer.middleware.js')

router.get('/',Auth,(req,res)=>{
    res.status(200).json({msg: 'This is Student routes'})
})

router.post('/login',studentController.studentLogin)
router.post('/logout',Auth,studentController.studentLogout)

router.post('/blog',Auth,upload.single('featured'),studentController.postBlog)
router.get('/blog',Auth,studentController.getBlog)
router.patch('/blog/:id',Auth,upload.single('featured'),studentController.updateBlog)
router.delete('/blog/:id',Auth,studentController.deleteBlog)

module.exports = router