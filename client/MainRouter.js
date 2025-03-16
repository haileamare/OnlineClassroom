import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import User from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivaetRoute'; // Fixed typo here
import MyCourse from './course/MyCourses';
import NewCourse from './course/NewCourse';
import Course from './course/Course';
import EditCourse from './course/EditCourse';
import Enrollment from './enrollment/enrollment';

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<User />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<PrivateRoute element={EditProfile} />} />
        <Route path="/seller/courses" element={<PrivateRoute element={MyCourse} />} />
        <Route path="/user/NewCourse" element={<NewCourse />} />
        <Route path="/teach/course/:courseId" element={<Course />} />
        <Route path="/teach/course/edit/:courseId" element={<PrivateRoute element={EditCourse} />} />
        <Route path="/learn/:enrollmentId" element={<Enrollment />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
