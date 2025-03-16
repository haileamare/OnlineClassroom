const create = async (params, credentials, course) => {
    console.log('courseDataa', course)
    try {

        let response = await fetch('/api/courses/by/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: course
        })
        return response.json()
    } catch (err) {
        console.log('under the course', err)
    }
}

const listByInstructor = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/courses/by/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
        })
        return response.json()
    } catch (err) {
        console.log('under courseslist', err)
    }
}

const read = async (params, credentials, signal) => {

    try {
        let response = await fetch('/api/courses/' + params.courseId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            signal: signal
        })
        // console.log('response',response,'params',params)
        return response.json()
    } catch (err) {
        console.log('errorin read', err)
    }
}
const newLesson = async (params, credentials, lesson) => {
    console.log('api', lesson)
    try {
        let response = await fetch('/api/courses/' + params.courseId + '/lesson/new', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(lesson)
        })
        return response.json()
    } catch (err) {
        console.log('NewLessonApi')
    }
}
const update = async ({ courseId }, credentials, courseData) => {
    
    try {

        let response = await fetch('/teach/course/edit/' + courseId, {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer ' +credentials.t
            },
            body: courseData
        })
        return await response.json()
    } catch (err) {
        console.log('err',err)
    }
}
const deleteCourse = async ({ courseId }, credentials) => {
    try {
        alert('here i am')
        let response = await fetch(`/api/deleteCourse/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'Bearer ' + credentials.t
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Assuming the response returns JSON
    } catch (err) {
        console.error('Error deleting:', err);
    }
};
const listPublished=async (signal)=>{
    try{
  let response=await fetch('/api/courses/published',{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
    },
    signal:signal
  })

  return await response.json()
}catch(err){
    console.log(err,'error published courses')
}
}
const enrollmentStats=async(params,credentials,signal)=>{
    try{
        let response=await fetch('/api/enrollment/stats/'+params.courseId,{
            method:'GET',
            headers:{
                'Authorization':'Bearer ' + credentials.t,
                 'Content-Type':'application/json'
            },
            signal:signal
        })
        return await response.json();
    }catch(err){
      console.log('enrollmentStats',err)
    }
}
export {enrollmentStats,listPublished,deleteCourse, update, newLesson, read, create, listByInstructor }