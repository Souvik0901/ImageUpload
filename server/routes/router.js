/* Importing the express module. */
import express from 'express';
import multer from 'multer';

/* Importing the functions from the auth and health controller files. */
import checkConnection from '../controllers/checkConnection';
import userController from '../controllers/userControllers';
import courseControllers from '../controllers/courseControllers';

// file upload or image upload using multer fuction
const fileStorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, './server/uploads');
  },
  filename(req, file, cb) {
    return cb(null, `${file.fieldname}__${Date.now()}__${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });

/* Creating a new router object. */
const router = express.Router();

router.use('/images', express.static('server/uploads'));



router.get('/health-check', checkConnection);
router.post('/login', userController.login);
router.post('/signup', userController.signup);



router.post('/uploadimage', upload.single('product'), courseControllers.createImage);
router.post('/addcourse', courseControllers.createCourseFields);
router.get('/getcourses', courseControllers.getCourses);
router.delete('/deletecourse/:id', courseControllers.deleteCourse);


/* Exporting the router object. */
export default router;
