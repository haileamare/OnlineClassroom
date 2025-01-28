import { Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import React ,{useState} from 'react'
import {StyledTextField} from '../user/Signin'
import { FileUpload } from '@mui/icons-material'
//import { isAuthenticated } from '../auth/auth-helper'
import {create} from './api-course'
import { useAuth } from '../auth/auth-helper'
import { ClassNames } from '@emotion/react'
import { useStyles } from '../core/Menu'
export default function (){
    const classes=useStyles()
    const theme=useTheme()
    const {auth}=useAuth()
    const jwt=auth
    const [values,setValues]=useState({
        name:'',
        description:'',
        image:'',
        category:'',
        redirect:false,
        error:''
    })

    const handleOnChange=(name)=>(event)=>{
        console.log('image',name)
    const value=name==='image'?
    event.target.files[0]
    :event.target.value
        setValues({...values,[name]:value})
    }
    
    const handleClick=()=>{
        let courseData=new FormData()
        values.name &&courseData.append('name',values.name)
        values.category &&courseData.append('category',values.category)
        values.description && courseData.append('description',values.description)
        values.image && courseData.append('image',values.image)
        
        create({
            userId:jwt.user._id
        },{
            t:jwt.token
        },courseData).then((data)=>{
            alert(data)
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,error:'',redirect:true})
            }
        })
    }
    return (
        <Card className={classes.card}>
            <Typography variant='h5' className={classes.typoText} style={{marginBottom:'1em'}}>
                New Course
            </Typography>
            <CardContent style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:'0'
            }}>
                <StyledTextField 
                label='CourseName'
                name='name'
                onChange={handleOnChange('name')}
                style={{marginBottom:'0'}}
                />
                <br/>
                <StyledTextField
                label='Description'
                name='description'
                onChange={handleOnChange('description')}
                 style={{marginBottom:'0'}}
                />
                <br/>
                <StyledTextField
                 label='category'
                 name='category'
                 onChange={handleOnChange('category')}
                 style={{marginBottom:'0'}}
                />
                <br/>
                <label htmlFor="file-upload">
                    <Button 
                    component='span'
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        background:theme.palette.customColors.lightGreen,
                        borderRadius:'3rem',
                        color:theme.palette.secondary.contrastText
                    }}>
                        Upload<FileUpload/> 
                    </Button>
                    <span>{values.image?'filename:'+values.image.name:''}</span>
                 </label>
                <input type='file' name='image' onChange={handleOnChange('image')} id='file-upload' style={{display:'none'}}/>
                 <Typography variant='h5' style={{

                 }}>
                    {values.error}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button onClick={handleClick} className={classes.buttons}>
                    Submit
                </Button>
            </CardActions>
        </Card>
    )
}