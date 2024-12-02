import express from 'express'
import userCtrl from '../controller/user.controller'
import authCtrl from '../controller/auth.contorller'

const router=express.Router()

router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.param('userId',userCtrl.userByID)
router.route('/api/users/:userId').get(authCtrl.requireSignin,userCtrl.read)
router.route('/api/users/:userId').put(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.update)
router.route('/api/users/:userId').delete(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.remove)
export default router