import { ClassNames, useTheme } from '@emotion/react';
import { ArrowUpward, Delete, FileUpload } from '@mui/icons-material';
import { Avatar, Badge, Button, CardHeader, CardMedia, IconButton, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';
import { useStyles } from '../core/Menu';
import { read, update } from './api-course';
import { withStyles } from '@mui/styles';

export default function EditCourse() {
    const theme = useTheme();
    const classes = useStyles();
    const { auth } = useAuth();
    const { courseId } = useParams();

    const [values, setValues] = useState({
        error: "",
        redirect: false
    });

    const imageUrl = `/api/course/photo?courseId=${courseId}`;
    const [course, setCourse] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        lessons: []
    });
   const [lessons,setLessons]=useState([])
    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value;
        setCourse({ ...course, [name]: value });
    };

    const handleLessonChange = (name, index) => (event) => {
        const lessons = [...course.lessons];
        lessons[index][name] = event.target.value;
       
        setCourse({ ...course, lessons: lessons });
    };

    const deleteLesson = (index) => (event) => {
        const lessons = [...course.lessons];
        lessons.splice(index, 1);
       
        setCourse({ ...course, lessons: lessons });
    };

    const moveUp = (index) => (event) => {
        const lessons = [...course.lessons];
        const moveUp = lessons[index];
        lessons[index] = lessons[index - 1];
        lessons[index - 1] = moveUp;
        setCourse({ ...course, lessons: lessons });
    };

    const clickSubmit = () => {
        let courseData = new FormData();
        course.name && courseData.append('name', course.name);
        course.description && courseData.append('description', course.description);
        course.image && courseData.append('image', course.image);
        course.category && courseData.append('category', course.category);
        courseData.append('lessons', JSON.stringify(course.lessons));

        update({ courseId: courseId }, { t: auth.token }, courseData).then((data) => {
            if (data && data.error) {
                console.log('errorupdated')
                setValues({ ...values, error: data.error });
                
            } else {
                console.log('updated',data)
                setValues({ ...values, redirect: true });
            }
        });
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
         
        read({ courseId }, { t: auth.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCourse(data);
            }
        });
       
        return function cleanUp() {
            abortController.abort();
        };
    }, [courseId,lessons]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100vw', overflowX: 'hidden' }}>
            <section style={{
                background: 'white',
                height: '100vh',
                width: '100%',
                zIndex: '100',
                padding: theme.spacing(3.5),
                overflowX: 'hidden'
            }}>
                <CardHeader className={classes.editCourse} title={
                    <TextField label="Title" type='text'
                        fullWidth value={course?.name} name='name'
                        onChange={handleChange('name')}
                    />
                }
                    subheader={<div><Link style={{ textDecoration: 'none', color: 'blue' }} to={'/user/' + course?.instructor?._id}>
                        By {course?.instructor?.name}
                    </Link><br />
                        {<TextField label='Category' type='text' fullWidth
                            value={course?.category}
                            name='category'
                            onChange={handleChange('category')} />}
                    </div>
                    }
                    action={<Button
                        style={{ position: 'absolute', marginRight: theme.spacing(8), width: '10%', right: theme.spacing(-4) }}
                        variant='contained' color='secondary'
                        onClick={clickSubmit}>Save</Button>}
                />

                <div className={classes.flex} >
                    <CardMedia
                        image={imageUrl}
                        title={course?.name}
                        className={classes.cardImage}
                    />
                    <div className={classes.details}>
                        <TextField multiline rows={'5'} label='Description' type='text' fullWidth
                            value={course?.description}
                            onChange={handleChange('description')}
                        /> <br />
                        <input id='icon-button-file' style={{ display: 'none' }} accept='image/*'
                            onChange={handleChange('image')} type='file' />
                        <label htmlFor='icon-button-file'>
                            <Button variant='outlined' color='secondary' component='span'>
                                Change Photo
                                <FileUpload />
                            </Button>
                        </label><span>{course?.image ? course?.image.name : ''}</span><br />
                    </div>
                </div>
            </section>
            <Typography variant='h4'
                style={{ zIndex: '100', background: 'white' }}>
                Lessons-Edit And Rearrange
            </Typography>
            <section style={{
                background: 'white', width: '100vw', zIndex: '100',
                padding: theme.spacing(5),
                paddingTop: theme.spacing(2)
            }}>

                <div style={{ background: theme.palette.customColors.llightGray }}>
                    {course?.lessons?.map((lesson, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: theme.spacing(1) }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                    <ListItemAvatar>
                                        <Avatar style={{ width: theme.spacing(7), height: theme.spacing(7) }}>{index + 1}</Avatar>
                                    </ListItemAvatar>
                                    {index !== 0 && (
                                        <IconButton color='primary' onClick={moveUp(index)} style={{ display: 'flex' }}>
                                            <ArrowUpward style={{ fill: 'green', marginLeft: theme.spacing(1) }} />
                                        </IconButton>
                                    )}
                                </div>
                                <ListItemText
                                    style={{ flex: '2', marginLeft: theme.spacing(3) }}
                                    className={classes.lessonsList}
                                    primary={
                                        <>
                                            <TextField
                                                label="Title"
                                                type='text'
                                                fullWidth
                                                value={lesson.title}
                                                onChange={handleLessonChange('title', index)}
                                                style={{ marginBottom: theme.spacing(1.3) }}
                                            />
                                            <br />
                                            <TextField
                                                multiline
                                                rows={'5'}
                                                label='Content'
                                                fullWidth
                                                style={{ marginBottom: theme.spacing(1.3) }}
                                                value={lesson.content}
                                                onChange={handleLessonChange('content', index)}
                                            />
                                            <br />
                                            <TextField
                                                label='Resource link'
                                                type='text'
                                                value={lesson.resource_url}
                                                fullWidth
                                                onChange={handleLessonChange('resource_url', index)}
                                                style={{ marginBottom: theme.spacing(1.3) }}
                                            />
                                        </>
                                    }
                                />
                                <IconButton edge='end' aria-label='up' color='primary'
                                    onClick={deleteLesson(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <hr style={{ width: '100%', border: '0.5px solid gray', margin: theme.spacing(2, 0) }} />
                        </div>
                    ))}


                </div>
            </section>
        </div>
    );
}
