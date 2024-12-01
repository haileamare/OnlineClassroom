import User from "../models/user.model";
import errorHandler from '../helpers/dbErrorHanlder.js'
import mongoose from 'mongoose';


const create=async (req,res)=>{
    const user=new User(req.body);
    try{
     await user.save()
     return res.status(200).json({
        message:'Successfully signed up!'
     })
    }catch(err){
      return res.status(400).json({
        error:dbErrorHanlder.getErrorMessage(err)
      })
    }
    
}

const list=async (req,res)=>{
    try{
        const users=User.find().select('name email updated created')
        res.json(users)
    }catch(err){
       res.status(400).json({
        error:errorHandler.getErrorMessage(err)
       })
    }
}

const userByID=async (req,res,next,id)=>{
    try{
        const user=User.findById(id)
         if(!user){
            res.status('400').json({
               error:'User not found' 
            })
         }
         req.profile=user
         next()
    }catch(err){
        res.status(400).json({
            error:errorHandler.getErrormessage(err)
        })
    }

}
const read=async (req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return res.json(req.profile)
}

const update=async (req,res)=>{
    try{
        let user=req.profile 
        extend(user,req.body)
        user.save()
        user.hashed_password=undefined
        user.salt=undefined
        return res.json(user)

    }catch(err){
         return res.status(401).json({
            error:''
         })
    } 
}
const photo=async (req,res)=>{

}

export {userByID,create,list,read,update}