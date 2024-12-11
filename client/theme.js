import React from "react";
import { pink } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';
const theme=createTheme({
    palette:{
        primary:{
            light:'#5c67a3',
            main:'#90EE90',
            dark:'#2e355b',
            contrastText:'#fff'
        },
        secondary:{
            light:'#ff79b0',
            main:'#ff4081',
            contrastText:'#000',
        },
        customColors:{
          lightGreen:'#24ed8f',
          lightOrange:'#db4458',
          gradientGreen:'linear-gradient(90deg,#0162c8,#55e7fc)',
          gradientPink:'linear-gradient(90deg,#755bea,#ff72c0)',
          blue:'#0c1bf2',
          red:'#e31414'

        },
        openTitle:'#3f4771',
        protectedTitle:pink[400],
        type:'light'
    }
})
export default theme