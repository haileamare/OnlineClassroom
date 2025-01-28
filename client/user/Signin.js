import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../core/Menu';
import { Button, Card, CardActions, CardContent, Grid, Grid2, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { signin } from '../auth/api-auth';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';


export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'green',
            borderRadius: '16px',
            borderWidth: '3px',

        },
        '&:hover fieldset': {
            borderColor: 'blue'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'purple',
        }
    },
    '& .MuiInputBase-input': {
        color: 'green',
        fontSize: '1.3em'
    },
    '& .MuiInputLabel-root': {
        color: 'blue'
    },
    marginBottom: theme.spacing(4)

}))

export default function Signin(props) {
    const {authenticate,auth}=useAuth()
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferer: "",
    })
    const classes = useStyles()
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    useEffect(() => {
        emailRef.current.focus()
    }, [])
    const handleSetValues = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }


    const handleClick = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        try {
            
            signin(user).then((data) => {
                
                if (data.error) {
                    setValues({ ...values, error: data.error, redirectToReferer: false })
                } else{
                      authenticate(data, () => {
                    //console.log(data)
                    setValues({ ...values, error: '', redirectToReferer: true })
                })
                }
              

            })
        } catch (err) {
            console.log('error', err)
        }

    }

   const {from}=(props.location && props.location.state) || {
    from:{
        pathname:'/'
    }
   }
   const {redirectToReferer}=values
   if(redirectToReferer){
    return (<Navigate to={from}/>)
   }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'max-content' }}>
            <Card className={classes.card}>
                <CardContent className={classes.ff}>

                    <Typography variant='h4'
                        className={classes.typoText}>
                        Sign Up
                    </Typography>
                    <StyledTextField
                        value={values.email}
                        id='email'
                        name='email'
                        label='email'
                        inputRef={emailRef}
                        onChange={handleSetValues('email')}
                    />
                    <br />
                    <StyledTextField
                        value={values.password}
                        id='password'
                        name='password'
                        label='password'
                        variant='outlined'
                        inputRef={passwordRef}
                        onChange={handleSetValues('password')}
                    />
                    <br/>
                    <span style={{fontSize:'1rem',color:'red'}}>{values.error}</span>
                </CardContent>
                <CardActions>
                    <Button color='primary' className={classes.buttons} onClick={handleClick}>
                        Submit
                    </Button>
                </CardActions>
            </Card>


        </div>
    )
}