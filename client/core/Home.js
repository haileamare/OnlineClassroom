import React, { useEffect ,useState} from 'react'
import Courses from '../course/Courses'
import { listPublished } from '../course/api-course'
export default function Home() {
    const [course, setCourse] = useState({})
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listPublished(signal).then((data) => {
            if (data && data.error) {
                console.log('whatatat',data.error)
            } else {
                console.log('dataa',data)
                setCourse(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
   
    return (
        <div>
            <Courses courses={course} />
        </div>
    )
}