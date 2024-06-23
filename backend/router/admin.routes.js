const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js')
const upload = require('../middlewares/multer.middleware.js')

router.get('/',  (req, res)=>{
   res.status(200).json({msg: "Admin"})
})

router.post('/register',adminController.adminRegister)
router.post('/login',adminController.adminLogin)
router.post('/logout',adminController.adminLogout)
router.post('/carousel',upload.single('carousel'),adminController.postCarousel)
router.get('/carousel',adminController.getCarousel);
router.delete('/carousel/:id',adminController.deleteCarousel)
router.post('/welcome',upload.single('welcome'),adminController.postWelcomeSection)
router.get('/welcome',upload.single('welcome'),adminController.getWelcomeSection)
router.patch('/welcome/:id',upload.single('welcome'),adminController.updateWelcomeSection)
router.post('/message-ceo',upload.single('ceo'),adminController.postCEOMessage)
router.patch('/message-ceo/:id',upload.single('ceo'),adminController.updateCEOMessage)

module.exports = router