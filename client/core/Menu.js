import React from 'react'
import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles'
//import theme from '../theme'
export const useStyles=makeStyles((theme)=>({
  appBar:{
    background:theme.palette.secondary.main
  }
}))

export default function Menu(){
    const classes=useStyles()

    return (
        <AppBar className={classes.appBar} >
            <Toolbar className={classes.toolBar}>
                hellow broter
            </Toolbar>
        </AppBar>
    )
}