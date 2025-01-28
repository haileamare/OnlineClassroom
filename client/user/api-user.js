
const create=async (user)=>{
    try{
        let response=await fetch('/api/users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        return response.json()
    }catch(err){
      console.log('user creation',err)
    }
}
const list=async (signal)=>{
    try{
       let response=await fetch('/api/users',{
        method:'GET',
        signal:signal
        
    })  
    return response.json()   
    }catch(err){
        console.log('under users list api',err)
    }

}
const read=async (signal,params,credentials)=>{
    try{
        let response=await fetch('/api/users/'+params.userId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + credentials.t
            },
            signal:signal
        }
    )
    return response.json()
    }catch(err){
      console.log('read single user',err)
    }
}

const update=async(params,credentials,data)=>{
    console.log('userData',data)
    try{
        let response=await fetch('/api/users/'+params.userId,{
            method:"PUT",
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer ' +credentials.t
            },
            body:data
        })
        return  await response.json()
    }catch(err){
      console.log('error in update',err)
    }
}

export  {create,list,read,update}