import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from './user/Signup';
import User from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivaetRoute'
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
            </Routes>
        </div>
    )
}
export default MainRouter