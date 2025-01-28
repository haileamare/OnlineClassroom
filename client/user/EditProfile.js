import React ,{useEffect,useState,useRef}from 'react'
import {Button, Card, CardActions, CardContent, FormControlLabel, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material'
import { useStyles } from '../core/Menu'
import { StyledTextField } from './Signin'
import { update } from './api-user'
import { useParams } from 'react-router-dom'
import {  useAuth } from '../auth/auth-helper'

export default function EditProfile(){
    const {auth,updateUser}=useAuth()
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        educator:false,
        user:{},
        error:''
    })
    const [dimensions,setDimensions]=useState({})
    const buttonRef=useRef()
    const {userId}=useParams()
    const jwt=auth
    const classes=useStyles()
    const classesButton=useStyles(dimensions)
    
    const handleOnClick=()=>{
      let formData=new FormData()
      values.name && formData.append('name',values.name)
      values.email && formData.append('email',values.email)
     values.password && formData.append('password',values.password)
      formData.append('educator',values.educator)
      
      update({userId},{t:jwt.token},formData).then((data)=>{
        if(data.error){
            console.log('dataerr',data.error)
            setValues({...values,error:data.error})
        }else{
            
            updateUser(data,()=>{
                setValues({...values,user:data})
            })
        }
      })
    }
    const handleToggle=(event)=>{
        let toggle=values.educator?false:true
        setValues({...values,educator:toggle})
    }
   
    const handleMouseEnter=(event)=>{
        //.log('event',event.pageY,'offset',buttonRef.current.offsetLeft)
        if(buttonRef.current){
            let width=event.pageX-buttonRef.current.offsetLeft
            let height=event.pageY-buttonRef.current.offsetTop
          setDimensions({height:height,width:width})
        }
    }
    const handleOnChange=(name)=>(event)=>{
         
        setValues({...values,[name]:event.target.value})
    }
return (
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'max-content'}}>
    <Card className={classes.card}>
        <Typography 
        variant='h6'
        className={classes.typoText}>
             Edit Profile
        </Typography>
        <CardContent>
            <StyledTextField 
              label='name'
              name='name'
              onChange={handleOnChange('name')}
            />
            <br/>
            <StyledTextField
            label='email'
            name='email'
            onChange={handleOnChange('email')}
            />
            <br/>
            <StyledTextField
            label='password'
            name='password'
            onChange={handleOnChange('password')}
            />
            <br/>
        </CardContent>
            <Typography >
                I Am an Educator
            </Typography>
            <FormControlLabel
            control={
                <Switch classes={{
                   checked:values.educator,
                   bar:classes.bar
                }}
                onChange={handleToggle}
                />}
            label={values.educator?'Yes':'No'}
           />
        <CardActions>
            <Button 
            ref={buttonRef}
            onMouseEnter={(e)=>handleMouseEnter(e)}
            color='primary'
            className={classesButton.buttons}
            style={{
                
            }}
            onClick={handleOnClick}
            >Submit</Button>
        </CardActions>
    </Card>
   </div>
)
}