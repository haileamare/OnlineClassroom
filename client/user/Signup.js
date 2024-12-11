import React ,{useState} from 'react'
import { Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { StyledTextField } from "./Signin";
import { useStyles } from '../core/Menu';
import { create } from './api-user';
import { data, Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate=useNavigate()
    const [values,setValues]=useState({
        name:'',
        password:'',
        email:'',
        redirectTo:false,
        error:''
    })
  const classes=useStyles()
  
   const handleSubmit=()=>{
     const user={
        name:values.name || undefined,
        email:values.email || undefined,
        password:values.email || undefined
     }
     create(user).then((data)=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,redirectTo:true})
        }
     })
   }
 
   const handleSetValues=(name)=>(event)=>{
    setValues({...values,[name]:event.target.value})
   }

    return (
        <div style={{ display: 'flex',justifyContent:'center',alignItems:'center',height:'max-content'}}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.typoText} variant='h4'>
                        Sign UP
                    </Typography>
                    <StyledTextField
                    label='name'
                    id='name'
                    name='name'
                    onChange={handleSetValues('name')}
                    />
                    <br />
                    <StyledTextField 
                    label='email'
                    id='email'
                    name='email'
                    onChange={handleSetValues('email')}
                    />
                    <br />
                    <StyledTextField
                    name='password'
                    label='password'
                    onChange={handleSetValues('password')}
                    />
                </CardContent>
                <CardActions>
                    <Button className={classes.buttons} onClick={handleSubmit}>Submit</Button>
                </CardActions>
            {
             values.redirectTo &&(
                <div style={{background:'green'}}>
                    <Dialog open={values.redirectTo} disableBackdropClick={true} className={classes.messageBox}  classes={{paper:classes.messageBox}}>
                        <DialogTitle className={classes.typoText} style={{width:'100%',marginBottom:'0',maxWidth:"100%",textAlign:'center'}}>New Account</DialogTitle>
                        <DialogContent style={{
                            fontFamily:'san-serif',
                            lineHeight:'2rem',
                            color:'green',
                            margin:'0',
                            paddingBottom:'0',
                            textWrap:'wrap',
                            overflowWrap:'break-word'
                            }}>
                            New account successfully created
                           
                        </DialogContent> 
                        <DialogContent style={{
                            fontFamily:'san-serif',
                            lineHeight:'2rem',
                            color:'red',
                            margin:'0',
                            padding:'0',
                            textWrap:'wrap',
                            overflowWrap:'break-word'
                            }}>
                            click below to goto signin
                        </DialogContent>
                        <Link to='/signin'>
                           <Button color='primary' autoFocus='autoFocus'
                           variant='contained'>
                             Sign In
                           </Button>
                        </Link>
                    </Dialog>
                </div>
             )
            }
            </Card>
        </div>

    )
}