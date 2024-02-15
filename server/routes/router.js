/* Importing the express module. */
import express from 'express';
import multer from 'multer';

/* Importing the functions from  controller files. */
import checkConnection from '../controllers/checkConnection';
import userController from '../controllers/userControllers';
import courseControllers from '../controllers/courseControllers';
import getUserControllers from '../controllers/getUserControllers';
import editProfile from '../controllers/editProfile';
import deleteAccount from '../controllers/deleteAccount';
import enrollmentList from '../controllers/enrollmentList';

/* Importing the functions from middleware files. */
import authenticateUser from '../middleware/authenticateUser';

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
router.post('/logout', userController.logout);
router.get('/getuserdata', authenticateUser.verifytoken, getUserControllers.getUser);
router.get('/removeuser', authenticateUser.verifytoken, deleteAccount.removeUser);
router.get('/getenrollmentlist', authenticateUser.verifytoken, enrollmentList.getStudentDetails);
router.post(
  '/updateprofileinfo',
  authenticateUser.verifytoken,
  upload.single('profileImg'),
  editProfile.changeUserdata,
);


router.post(
  '/createcoursewithimage',
  authenticateUser.verifytoken,
  upload.single('courseImage'),
  courseControllers.createCourseWithImage,
);
router.get('/getcourses', authenticateUser.verifytoken, courseControllers.getCourses);
router.get('/getsinglecourse/:id', authenticateUser.verifytoken, courseControllers.getSingleCourse);
router.get('/paginatedcourses', authenticateUser.verifytoken, courseControllers.paginatedCourses);
router.delete('/deletecourse/:id', authenticateUser.verifytoken, courseControllers.deleteCourse);
router.patch(
  '/updatecourse/:id',
  authenticateUser.verifytoken,
  upload.single('courseImage'),
  courseControllers.updateCourse,
);


/* Exporting the router object. */
export default router;

