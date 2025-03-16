import { Button } from '@mui/material';
import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';
import PropTypes from 'prop-types'
import {create} from '../enrollment/enrollment-api'
export default function Enroll({courseId}){
    const [values,setValues]=useState({
        enrollmentId:'',
        error:'',
        redirect:false
    })
    const navigate=useNavigate();
    const {auth}=useAuth()
    const StyledButton=styled(Button)(({theme})=>({
       background:'orange',
       marginRight:theme.spacing(2),
       color:'black'
    }))
    const clickEnroll=()=>{
       
        const jwt=auth
        create({
            courseId:courseId
        },{
            t:auth.token
        }).then((data)=>{
            console.log('dataalew',data)
            if(data && data.error){
                console.log('goo goo')
                setValues({...values,error:data.error})
            }else{
                
                setValues({...values,enrollmendId:data._id,redirect:true})
            }
        })
    }
    if(values.redirect){
        return(
           navigate('/learn'+values.enrollmentId)
        )
    }
       return (
        <StyledButton variant='contained' color='secondary'
        onClick={clickEnroll}>Enroll</StyledButton>
       )
}
Enroll.propTypes={
    courseId:PropTypes.string.isRequired
}