const signin=async (user)=>{
    try{
   let response=await fetch('/auth/signin',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(user)
    })
    alert('hay')
    return await response.json()
    }catch(err){
  console.log('under signin',err)
    }
 
}

const signout=async ()=>{
    try{
        const response=await fetch('/auth/signout',{
            method:'GET'
    })
    return await response.json() 
    }catch(err){
 console.log('under signout',err)
    }

}

export {signout,signin}