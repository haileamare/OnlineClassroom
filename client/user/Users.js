import React, { useEffect, useState } from "react";
import { list } from "./api-user";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward, Person } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { ClassNames, useTheme } from "@emotion/react";
import { useStyles } from "../core/Menu";


export default function User(){
    const [users,setUsers]=useState([])
    const classes=useStyles()
    const theme=useTheme()
const StyledDiv = styled('div')(({ theme }) => ({
  display:'flex',
  justifyContent:'start',
  alignItems:'start',
  width:'100%',
  padding:'1rem 1rem',
}))

    useEffect(()=>{
     const abortController=new AbortController()
     const signal=abortController.signal

     list(signal)
     .then((data)=>{
        if(data.error){
         
        }else{
            console.log(data)
        setUsers(data)
        }
     })
     
     return function cleanup(){
        abortController.abort()
     }
    },[])

    return (
        <div style={{
            display:'flex',
            justifyContent:'start',
            alignItems:'center',
            height:"100vh",
            }}>
            <Paper className={classes.paperCard} elevation={4}>
                <Typography 
                variant="h6" 
                style={{
                position:'fixed',
                top:'5rem',
                left:'2rem',
                zIndex:'100',
                background:'inherit',
                width:'100%',
                padding:theme.spacing(3),
                paddingLeft:theme.spacing(1)}}>
                    All Users
                </Typography>
            <List dense className={classes.list}>
                {
                    users.map((item,i)=>(
                      <StyledDiv key={i}>
                        <Link to='/user/${item._id}' key={i} className={classes.linkUsers} >
                          <ListItem 
                           secondaryAction={
                            <IconButton edge="end">
                                <ArrowForward/>
                            </IconButton>
                           }>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                          </ListItem>
                        </Link>
                     </StyledDiv>
                    ))
                }
            </List>
            </Paper>
        </div>
    )
}