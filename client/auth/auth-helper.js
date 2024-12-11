import { isConstructorDeclaration } from "typescript"
import { signout } from "./api-auth"

const authenticate=(jwt,cb)=>{
  if(typeof window !== 'undefined'){
    //console.log('are you setting jwt')
    sessionStorage.setItem('jwt',JSON.stringify(jwt))
   // console.log(sessionStorage.getItem('jwt'))
  }
  cb()
}
const isAuthenticated=()=>{
    if(typeof window ==='undefined')
        return false
    if(sessionStorage.getItem('jwt')){
       // console.log('hellow jwt',sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'))
    }
    else
      return false
}
const clearJWT=(cb)=>{
    if(typeof window !=='undefined')
        sessionStorage.removeItem('jwt')

    signout().then((data)=>{
        document.cookie = "t=; expires=Thu, 01 jan 1970 00:00:00 UTC path=/"
    })
    cb()
}

const updateUser=(data,cb)=>{
    try{
        if(typeof window !== 'undefined'){
           const auth=JSON.parse(sessionStorage.getItem('jwt'))
           console.log('authuser',auth)
           auth.user=data
           sessionStorage.setItem('jwt',JSON.stringify(auth))
           cb()
        }

    }catch(err){
        console.log('update User auth error',err)
    }
}
export {clearJWT,isAuthenticated,authenticate,updateUser}