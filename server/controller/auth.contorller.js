import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import {expressjwt as expressjwt} from 'express-jwt'
import config from './../../config/config'

const signin=async (req,res)=>{
  try{
    let user=User.findOne({"email":req.body.email})
    if(!user){
        return res.status(401).json({
            error:'user not found from the email'
        })
    }
    if(!user.authenticate(req.body.password)){
        return res.status(401).json({
            error:"password does not match"
        })
    }
    let token=jwt.sign({_id:user._id},config.jwtSecret,{algorithm:'HS256'})
    res.cookie('t',token,{expire:new Date(Date.now() +9999)})
    return res.status.json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        token:token
    })
  }catch(err){
     res.statu(401).send({error:"an error occured during sing-in"})
  }
}
const signout=(req,res)=>{
    res.clearcookie("t");
    return res.status(200).json({
        message:"Signed out"
    })
}

const requireSignin=expressjwt({
    secret:config.jwtSecret,
    algorithm:['HS256'],
    userPropry:'auth'
})

const hasAuthorization=(req,res,next)=>{
    const authorized=req.profile && req.auth & req.profile._id===req.profile._id
    
    if(!authorized){
     return res.status(403).json({
        error:"user is not authorized"
     })
    }
    next()
}
export {requireSignin,signout,signin,hasAuthorization} 