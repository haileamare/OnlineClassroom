import React from 'react'
//import { isAuthenticated } from './auth-helper'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-helper'
const PrivateRoute=({element:Element,...rest})=>(

    useAuth().auth?(
        <Element {...rest}/>
    ):(
        <Navigate to={{
            pathname:'/',
            state:{from:rest.location}
        }}/>
    )
)
export default PrivateRoute