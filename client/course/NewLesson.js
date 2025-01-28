import React,{useState,useEffect} from 'react'
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, } from '@mui/material'
import PropTypes from 'prop-types'
import { StyledTextField } from '../user/Signin'
import { useAuth } from '../auth/auth-helper'
import { newLesson } from './api-course'

export default function NewLesson(props){
    const {auth}=useAuth()
    const [values,setValues]=useState({
        title:'',
        content:'',
        resource_url:'',
        error:''
    })
   
    const handleOnChange=(name)=>(event)=>{
        setValues({...values,[name]:event.target.value})
    }
   
    const handleClose=()=>{
        props.setOpen(prev=>!prev)
    }
    const clickSubmit=()=>{
        const jwt=auth
        const lesson={
            title:values.title ||undefined,
            content:values.content || undefined,
            resource_url:values.resource_url || undefined
        }
        console.log('lesson',lesson)
        newLesson({
            courseId:props?.courseId
        },{
            t:auth.token
        },lesson).then((data)=>{
            if(data.error && data){
                setValues({...values,error:data.error})
            }else{
                props.addLesson(data)
                setValues({...values,title:'',content:'',resource_url:''})
                

            }
        })

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'max-content' }}>
            <Dialog open={open} >
                <DialogTitle>Add Lessons</DialogTitle>
                <DialogContent>
                    <StyledTextField onChange={handleOnChange('title')} label='title' value={values.title} name='title'/><br/>
                    <StyledTextField onChange={handleOnChange('content')} label='Content' value={values.content} name='content'/><br/>
                    <StyledTextField onChange={handleOnChange('resource_url')} label='resource_url' value={values.resource_url} name='resource_url'/><br/>
                </DialogContent>
                <DialogActions>

                    <Button component={'span'} onClick={clickSubmit}>
                        Submit
                    </Button>
                    <Button component={'span'} onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
NewLesson.propTypes={
    courseId:PropTypes.string.isRequired,
    addLesson:PropTypes.func.isRequired
}