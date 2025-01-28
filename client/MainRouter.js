import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from './user/Signup';
import User from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivaetRoute'
import MyCourse from './course/MyCourses'
import NewCourse from './course/NewCourse'
import Course from './course/Course'
const MainRouter=()=>{
    return (
        <div>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/signin" Component={Signin}/>
                <Route path='/signup' Component={Signup}/>
                <Route path='/users' Component={User}/>
                <Route path='/user/:userId' Component={Profile}/>
                <Route path='/user/edit/:userId' element={<PrivateRoute element={EditProfile}/>}/>
                <Route path='/seller/courses' element={<PrivateRoute element={MyCourse}/>}/>
                <Route path='/user/NewCourse' Component={NewCourse}/>
                <Route path='/teach/course/:courseId' Component={Course}/>
            </Routes>
        </div>
    )
} 
export default MainRouter