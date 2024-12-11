import React from 'react'
import { isAuthenticated } from './auth-helper'
import { Navigate } from 'react-router-dom'

const PrivateRoute=({element:Element,...rest})=>(
    isAuthenticated()?(
        <Element {...rest}/>
    ):(
        <Navigate to={{
            pathname:'/',
            state:{from:rest.location}
        }}/>
    )
)
export default PrivateRoute