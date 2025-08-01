import express from 'express'
import authCtrl from '../controller/auth.contorller'
import courseCtrl from '../controller/course.controller'
import enrollmentCtrl from '../controller/enrollment.controller'
const router=express.Router()


router.route('/api/enrollment/enrolled')
  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/api/enrollment/new/:courseId')
  .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

router.route('/api/enrollment/stats/:courseId')
  .get(enrollmentCtrl.enrollmentStats)

router.route('/api/enrollment/complete/:enrollmentId')
  .put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete) 

router.route('/api/enrollment/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
  

router.param('courseId', courseCtrl.courseByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)


export default router;