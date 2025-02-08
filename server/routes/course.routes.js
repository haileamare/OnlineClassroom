import express from 'express';
import authCtrl from '../controller/auth.contorller';
import userCtrl from '../controller/user.controller';
import courseCtrl from '../controller/course.controller';
const router = express.Router();

// Define param middleware first
router.param('userId', userCtrl.userByID);
router.param('courseId', courseCtrl.courseByID);

// Route for creating a course by userId
router.route('/api/courses/by/:userId')
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.isEducator,
    courseCtrl.create
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    courseCtrl.listByInstructor
  );

// Route for reading a course by courseId
router.route('/api/courses/:courseId')
  .get(authCtrl.requireSignin, courseCtrl.read);

  router.route('/api/courses/:courseId/lesson/new')
  .put(authCtrl.requireSignin,
    courseCtrl.isInstructor,
  courseCtrl.newLesson)
// Route for course photo
router.route('/api/course/photo')
  .get(courseCtrl.getCourse, courseCtrl.photo, courseCtrl.defaultPhoto);
router.route('/api/deleteCourse/:courseId')
.delete(authCtrl.requireSignin,courseCtrl.isInstructor,
  courseCtrl.remove
)
router.route('teach/course/edit/:courseId')
.put(authCtrl.requireSignin,courseCtrl.isInstructor,courseCtrl.update)

export default router;
