const create=async(params,credentials,course)=>{
    console.log('courseDataa',course)
    try{
    
        let response=await fetch('/api/courses/by/'+params.userId,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer ' + credentials.t
            },
            body:course
        })
        return  response.json()
    }catch(err){
          console.log('under the course',err)
    }
}

const listByInstructor=async(params,credentials,signal)=>{
    try{
        let response=await fetch('/api/courses/by/'+params.userId,{
            method:'GET',
            signal:signal,
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer '+ credentials.t
            },
        })
        return  response.json()
    }catch(err){
        console.log('under courseslist',err)
    }
}

const read=async(params,credentials,signal)=>{
   
    try{
        let response=await fetch('/api/courses/'+params.courseId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ credentials.t
            },
           signal:signal
        })
       // console.log('response',response,'params',params)
        return response.json()
    }catch(err){
           console.log('errorin read',err)
    }
}
const newLesson=async (params,credentials,lesson)=>{
  console.log('api',lesson)
try{
   let response=await fetch('/api/courses/'+params.courseId+'/lesson/new',{
        method:'PUT',
        headers:{
           'Accept':'application/json',
           'Content-Type':'application/json',
           'Authorization':'Bearer '+ credentials.t
        },
        body:JSON.stringify(lesson)
   })
   return response.json()
}catch(err){
       console.log('NewLessonApi')
}
}
export  {newLesson,read,create,listByInstructor}