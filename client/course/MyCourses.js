import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from '@mui/material'
import { listByInstructor } from './api-course'
import { useAuth } from '../auth/auth-helper'
import { Link, Navigate } from 'react-router-dom'
import { Add } from '@mui/icons-material'
import { useStyles } from '../core/Menu'
export default function () {
    const [values, setValues] = useState({
        error: '',
        courses: [],
        redirectTo: false
    })
    const { auth } = useAuth()
    const theme = useTheme()
    const jwt = auth.token
    const classes=useStyles()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByInstructor({
            userId: auth.user._id
        },
            { t: jwt },
            signal
        ).then((data) => {
            if (data.error) {
                alert('hay')
                setValues({ ...values, error: data.error, redirectTo: true })
            } else {
                setValues({ ...values, courses: data })
            }
        })
        return function cleanUp() {
            abortController.abort()
        }
    }, [])
    if (values.redirectTo) {
        return <Navigate to={'/signin'} replace={true} />
    }
    return (
        <Card sx={{
            margin: `${theme.spacing(15)} ${theme.spacing(4)} ${theme.spacing(5)}`, display: 'flex',
            alignItems: '', justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Box sx={{
                width: '95%'
                , display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexDirection: 'row',
            }}>
                <Box component={'h2'} sx={{
                    color: theme.palette.customColors.red,
                    marginLeft: theme.spacing(3)
                }}>
                    Your Courses
                </Box>
                <IconButton sx={{ background: 'black', color: 'white', fontSize: '1rem', borderRadius: '0' }} component={Link} to='/user/newCourse'>
                    <Add sx={{ background: 'black', fontSize: theme.spacing(3) }} /> NEW COURSE
                </IconButton>
            </Box>
            <CardContent >

                {
                    values.courses.map((course, index) => (
                        <Button style={{ textDecoration: 'none',padding: '0' }} key={index} component={Link} to={'/teach/course/' + course._id} >
                        
                            <ListItem className={classes.imageList}>
                                <ListItemAvatar className={classes.listImage}>
                                    <Avatar src={`/api/course/photo?courseId=${course._id}`}
                                        sx={{
                                            width: '100%',
                                            height:'100%',
                                            borderRadius: "10px",
                                            margin:'0',
                                            backgroundSize:'contain'

                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText  className={classes.listText} 
                                    primary={<Typography variant={'h5'}
                                        sx={{ fontWeight: 'bold',marginTop:0 }}>
                                        {course.name}</Typography>}
                                    secondary={<span style={{textWrap:'wrap',textAlign:'justify',textJustify:'inter-word', fontSize:theme.spacing(1.5)}}>{course.description}</span>} />
                            </ListItem>
                            <Divider sx={{height:theme.spacing(2)}} />
                        </Button>

                    ))

                }

            </CardContent>
        </Card>
    )
}