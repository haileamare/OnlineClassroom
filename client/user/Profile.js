import React ,{useEffect,useState} from 'react'
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { Edit, Lock, Person } from '@mui/icons-material';
import { useStyles } from '../core/Menu';
import { Link, useParams } from 'react-router-dom';
//import { isAuthenticated } from '../auth/auth-helper';
import { read } from './api-user';
import { useTheme } from '@emotion/react';
import { useAuth } from '../auth/auth-helper';

export default function (){
  const {auth}=useAuth()
    const [values,setValues]=useState({
        user:{},
        error:''
    })
    const classes=useStyles()
    const userId=useParams()
    const theme=useTheme()
    const jwtToken=auth
   
     useEffect(()=>{
      const abortController=new AbortController()
      const signal=abortController.signal
       
      read(signal,userId,{t:jwtToken.token}).then((data)=>{
        if(data.error){
           setValues({...values,error:data.error})
        }else{
          setValues({...values,user:data})
        }
      })
    },[])
    return (
        <div>
            <Paper className={classes.paperCard} data-label='profileCard'>
                <Box component='h3'
                 className={classes.typoText}
                 style={{
                    marginBottom:theme.spacing(1),
                    background:'white'
                 }}>
                   Profile
                </Box>
                <List dense>
                     <ListItem 
                     secondaryAction={
                        <IconButton component={Link} to={'/user/edit/'+auth.user._id}>
                            <Edit/>
                        </IconButton>
                     }
                     >
                        <ListItemAvatar className="">
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                         primary={<Typography variant='h6'
                          style={{
                            fontFamily:'inherit',
                            fontWeight:'bold'
                          }}>
                          {values.user.name}
                        </Typography>} 
                        secondary={
                            <Typography variant='p'style={{fontFamily:'cursive'}}>
                               <span>JoinedAt: </span>{ values.user.created}
                            </Typography>
                            }/>
                        
                     </ListItem>
                      <Divider/>
                </List>
            </Paper>
        </div>
    )
}