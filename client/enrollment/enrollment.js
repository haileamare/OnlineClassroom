import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';
import {
    Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Drawer, List,
    ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, Typography
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Info } from '@mui/icons-material';
import { read, complete } from './enrollment-api';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(8),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
    paddingTop:0
  //  zIndex: -10, // Drawer positioned behind other content
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#616161',
    top:theme.spacing(10.4),
    paddingTop:0
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: `calc(100% - ${drawerWidth}px)`,
    position: 'relative'
  },
  selectedDrawer: {
    backgroundColor: '#e9e3df',
  },
  unselected: {
    backgroundColor: '#ffffff',
  },
   listItem:{
    position:'absolute',
    top:theme.spacing(-7),
    padding:theme.spacing(2.5)
   },
  listItemText: {
    paddingBlock: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    padding: '24px 40px 20px',
    margin: '20px 0',
  },
  para: {
    whiteSpace: 'pre-wrap',
  },
  avatar: {
    color: '#9b9b9b',
    border: '1px solid #bdbdbd',
    background: 'none',
  },
  actionButton: {
    marginTop: theme.spacing(2),
  }
}));

export default function Enrollment() {
    const [enrollment, setEnrollment] = useState({
        course: { instructor: [], lessons: [] },
        lessonStatus: []
    });

    const [values, setValues] = useState({
        redirect: false,
        error: '',
        drawer: -1
    });

    const { enrollmentId } = useParams();
    const { auth } = useAuth();
    const jwt = auth;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ enrollmentId: enrollmentId }, { t: jwt.token }, signal).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setEnrollment(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        };
    }, [enrollmentId, jwt.token]);

    const selectDrawer = (index) => () => {
        setValues({ ...values, drawer: index });
    };

    const totalCompleted = (lessonStatus) => {
        return lessonStatus.filter(lesson => lesson.complete).length;
    };

    const markComplete = () => {
        if (!enrollment.lessonStatus[values.drawer].complete) {
            const updatedLessonStatus = [...enrollment.lessonStatus];
            updatedLessonStatus[values.drawer].complete = true;

            let count = totalCompleted(updatedLessonStatus);
            let updatedData = {
                lessonStatusId: updatedLessonStatus[values.drawer]._id,
                complete: true,
                courseCompleted: count === updatedLessonStatus.length
            };

            complete({ enrollmentId: enrollmentId }, { t: jwt.token }, updatedData).then((data) => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setEnrollment({ ...enrollment, lessonStatus: updatedLessonStatus });
                }
            });
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={selectDrawer(-1)}
                        className={values.drawer === -1 ? clsx(classes.selectedDrawer ,classes.listItem): clsx(classes.unselected,classes.listItem)}>
                        <ListItemIcon><Info /></ListItemIcon>
                        <ListItemText primary={"Course Overview"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListSubheader component="div">Lessons</ListSubheader>
                    {enrollment.lessonStatus.map((lesson, index) => (
                        <ListItem button key={index} onClick={selectDrawer(index)}
                            className={values.drawer === index ? classes.selectedDrawer : classes.unselected}>
                            <ListItemAvatar>
                                <Avatar>{index + 1}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                classes={{ root: classes.listItemText }}
                                primary={enrollment.course.lessons[index]?.title || "Untitled Lesson"}
                                secondary={
                                    <Button>
                                        {lesson.complete ? <CheckCircle /> : <RadioButtonUnchecked />}
                                    </Button>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
          { values.drawer !=-1 ? ( <main className={classes.content}>
                <div className={classes.toolbar} />
                {values.drawer !== -1 && (
                    <>
                        <Typography variant="h5">{enrollment.course.name}</Typography>
                        <Card className={classes.card}>
                            <CardHeader
                                action={
                                    <Button
                                        onClick={markComplete}
                                        variant={enrollment.lessonStatus[values.drawer]?.complete ? 'contained' : 'outlined'}
                                        color="secondary">
                                        {enrollment.lessonStatus[values.drawer]?.complete ? "Completed" : "Mark as Complete"}
                                    </Button>
                                }
                                title={enrollment.course.lessons[values.drawer]?.title || "Lesson Title"}
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    {enrollment.course.lessons[values.drawer]?.content || "No content available"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <a href={enrollment.course.lessons[values.drawer]?.resource_url || "#"} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" color="primary">
                                        Resource Link
                                    </Button>
                                </a>
                            </CardActions>
                        </Card>
                    </>
                )}
            </main>):
            (<main className={classes.content}>
                <div className={classes.toolbar} />
            
                        <Typography variant="h5">{enrollment.course.name}</Typography>
                        <Card className={classes.card}>
                            <CardHeader
                                title={"by"+enrollment.course.instructor.name|| "Lesson Title"}
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    {enrollment.course.description}
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    
            </main>)
}
        </div>
    );
}
