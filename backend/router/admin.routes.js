const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js');
const { Auth } = require('../middlewares/Auth.middleware.js');
const upload = require('../middlewares/multer.middleware.js')
const multer = require('multer');

const upload2 = multer()

router.get('/',Auth,  (req, res)=>{
   res.status(200).json({msg: "Admin"})
})

router.post('/register',adminController.adminRegister)
router.post('/login',adminController.adminLogin)
router.post('/logout',Auth,adminController.adminLogout)
router.post('/carousel',Auth,upload.single('carousel'),adminController.postCarousel)
router.get('/carousel',Auth,adminController.getCarousel);
router.delete('/carousel/:id',Auth,adminController.deleteCarousel)
router.post('/welcome',Auth,upload.single('welcome'),adminController.postWelcomeSection)
router.get('/welcome',Auth,adminController.getWelcomeSection)
router.patch('/welcome/:id',Auth,upload.single('welcome'),adminController.updateWelcomeSection)

router.post('/message-ceo',Auth,upload.single('ceo'),adminController.postCEOMessage)
router.get('/message-ceo',Auth,adminController.getCEOMessage)
router.patch('/message-ceo/:id',Auth,upload.single('ceo'),adminController.updateCEOMessage)

router.post('/message-director',Auth,upload.single('director'),adminController.postDirMsg);
router.get('/message-director',Auth,adminController.getDirMsg);
router.patch('/message-director/:id',Auth,upload.single('director'),adminController.updateDirMsg);

router.post('/affiliation',Auth,upload.single('affiliation'),adminController.postAffiliation);
router.get('/affiliation',Auth,adminController.getAffiliation);
router.patch('/affiliation/:id',Auth,upload.single('affiliation'),adminController.updateAffiliation);

router.post('/courses',Auth,upload.single('featured'),adminController.postCourse);
router.get('/courses',Auth,adminController.getCourses);
router.patch('/courses/:id',Auth,upload.single('featured'),adminController.updateCourse);
router.delete('/courses/:id',Auth,adminController.deleteCourse);

router.post('/credit-transfers',Auth,upload.single('credit-transfers'),adminController.postCreditTransfers);
router.get('/credit-transfers',Auth,adminController.getCreditTransfers);
router.delete('/credit-transfers/:id',Auth,adminController.deleteCreditTransfers);

router.post('/student',Auth,upload2.none(),adminController.postStudent);
router.get('/student',Auth,adminController.getStudent);
router.patch('/student/:id',upload2.none(),Auth,adminController.updateStudent);
router.delete('/student/:id',Auth,adminController.deleteStudent);

router.post('/blog',Auth,upload.single('blog-image'),adminController.postBlog);
router.get('/blog',Auth,adminController.getBlog);
router.patch('/blog/:id',Auth,upload.single('blog-image'),adminController.updateBlog);
router.delete('/blog/:id',Auth,adminController.deleteBlog);

router.post('/setting',Auth,upload.single('logo'),adminController.postSetting);
router.patch('/setting/:id',Auth,upload.single('logo'),adminController.updateSetting);
router.get('/setting',Auth,adminController.getSetting);

module.exports = router