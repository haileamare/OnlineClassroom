import User from "../models/user.model";
import dbErrorHanlder from '../helpers/dbErrorHanlder.js'
import extend from 'lodash/extend'
import {IncomingForm} from 'formidable'

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        return res.status(200).json({
            message: 'Successfully signed up!'
        })
    } catch (err) {
    
        return res.status(400).json({
            error: dbErrorHanlder.getErrorMessage(err)
        })
    }

}

const list = async (req, res) => {
    try {
        const users =await User.find().select('name email  created')
        res.json(users)
    } catch (err) {
        res.status(400).json({
            error: 'dbErrorHanlder.getErrorMessage(err)'
        })
    }
}

const userByID = async (req, res, next, id) => {

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status('400').json({
                error: 'User not found'
            })
        }
        
        req.profile = user
        next()
    } catch (err) {
        res.status(400).json({
            error: dbErrorHanlder.getErrorMessage(err)
        })
    }

}
const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await User.findByIdAndDelete(user._id)
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined
        
        res.json(deletedUser)
    } catch (err) {
        console.log('error remove')
        return res.status(400).json({
            error: err.message
        })
    }


}
const update = async (req, res) => {
    const form=new IncomingForm()
    form.keepExtensions=true

   form.parse(req,(err,fields,files)=>{
     try{
        let user=req.profile
        console.log('fields',fields)
        if(Array.isArray(fields.name)) fields.name=fields.name[0]
        if(Array.isArray(fields.email)) fields.email=fields.email[0]
        if(Array.isArray(fields.password)) fields.password=fields.password[0]
        if(Array.isArray(fields.educator)) fields.educator=fields.educator[0]
       
        extend(user,fields)
        user.save()
        res.json(user)
     }catch(err){
          res.status(400).json({
            error:err
          })
     }
})
}
const isEducator=(req,res,next)=>{
    const isEducator=req.profile && req.profile.educator
    if(!isEducator){
        return res.status(403).json({
            error:"User is not an educator"
        })
    }
    next()
}

export default { isEducator,remove,userByID, create, list, read, update }