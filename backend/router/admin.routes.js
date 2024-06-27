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
router.get('/welcome',adminController.getWelcomeSection)
router.patch('/welcome/:id',upload.single('welcome'),adminController.updateWelcomeSection)

router.post('/message-ceo',upload.single('ceo'),adminController.postCEOMessage)
router.get('/message-ceo',adminController.getCEOMessage)
router.patch('/message-ceo/:id',upload.single('ceo'),adminController.updateCEOMessage)

router.post('/message-director',upload.single('director'),adminController.postDirMsg);
router.get('/message-director',adminController.getDirMsg);
router.patch('/message-director/:id',upload.single('director'),adminController.updateDirMsg);

router.post('/affiliation',upload.single('affiliation'),adminController.postAffiliation);
router.get('/affiliation',adminController.getAffiliation);
router.patch('/affiliation/:id',upload.single('affiliation'),adminController.updateAffiliation);

router.post('/courses',upload.single('featured'),adminController.postCourse);
router.get('/courses',adminController.getCourses);
router.patch('/courses/:id',upload.single('featured'),adminController.updateCourse);
router.delete('/courses/:id',adminController.deleteCourse);

router.post('/credit-transfers',upload.single('credit-transfers'),adminController.postCreditTransfers);
router.get('/credit-transfers',adminController.getCreditTransfers);
router.delete('/credit-transfers/:id',adminController.deleteCreditTransfers);

module.exports = router