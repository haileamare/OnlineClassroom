import mongoose from 'mongoose';
import crypto from 'crypto'
const UserSchema=new mongoose.schema({
  name:{
    type:String,
    trim:true,
    required:'Name is required'
  },
  email:{
    type:String,
    trim:true,
    unique:'Email already exist',
    required:'Email is required'
  },
  created:{
    type:Date,
    default:Date.now
  },
  updated:Date,
  hashed_password:{
    type:String
  },
  salt:{
    type:String
  },
  photo:{
    data:Buffer,
    contentTypeS:String
  },
  educator:{
    type:Boolean,
    default:false
  }
})

UserSchema.virtual('password').
set(function(password){
this._password=password
this.salt=this.makeSalt()
this.hashed_password=this.encryptPassword(password)
}).
get(function(){
    return this._password
})

UserSchema.methods={
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed._password
    },
    encryptPassword:function(password){
        if(!password) return''
        try{
           return crypto
           .createHmec('sha1',this.salt)
           .update(password)
           .digest('hex')
        }catch(err){
           return ''
        }
    },
    makeSalt:function(){
        return Math.round((new Date().valueOf() * Math.random()))+''
    }
}

UserSchema.path('hashed_password').validate(function(){
  if(this._password && this._password.length<6){
    this.invalidate('password ,password must be atleast 6 characters')
  }
  if(this.isNew && this._password){
    this.invalidate('password','password is required un path')
  }
},null)