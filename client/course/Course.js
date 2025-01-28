import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { read } from './api-course';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';
import { useTheme } from '@emotion/react';
import { useStyles } from '../core/Menu';
import { Add, Delete, Edit } from '@mui/icons-material';
import NewLesson from './NewLesson';
export default function Course() {
  const [values, setValues] = useState({
    error: '',
    courseData: {},
  });
  const [open, setOpen] = useState(false);
  const { courseId } = useParams(); // Fix useParams usage
  const { auth } = useAuth();
  const theme = useTheme();
  const classes = useStyles();
  const imageUrl = `/api/course/photo?courseId=${values.courseData?._id}`;

  const addLesson = (course) => {
    setValues({ ...values, courseData: course });
  };
  
  const addLessonButton = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ courseId }, { t: auth.token }, signal).then((data) => {
      if (data.error) {
        console.log('Data error:', data.error);
        setValues({ ...values, error: data.error });
      } else {
        console.log('Fetched data:', data);
        setValues({ ...values, courseData: data });
      }
    });

    return () => abortController.abort();
  }, [courseId]); // Ensure correct dependency

  return (
    <Card className={classes.cardCourse} data-label='cardCourse'>
      {open && auth.user._id === values.courseData.instructor?._id && (
        <NewLesson courseId={courseId} addLesson={addLesson} setOpen={setOpen} />
      )}
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant='h6' className={classes.titleTypo}>{values.courseData?.name || 'Loading...'}</Typography>}
        subheader={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to={`/api/user/${values.courseData?.instructor?._id}`} style={{ textDecoration: 'none', marginTop: theme.spacing(1) }}>
              By <span style={{ fontSize: theme.spacing(2.4), fontFamily: 'Roboto san-serif', color: theme.palette.customColors.lightOrange }}>{values.courseData?.instructor?.name || 'Unknown'}</span>
            </Link>
            <Typography variant='h5' style={{ fontFamily: 'Roboto sans-serif', background: "rgba(0,0, 0,.5)", width: '200px', filter: 'blur(100%)' }}>{values.courseData?.category || 'Uncategorized'}</Typography>
          </div>
        }
        action={
          <div className={classes.butonCon}>
            {auth.user._id && auth.user._id === values.courseData.instructor?._id && (
              <span>
                <IconButton sx={{ color: theme.palette.customColors.lightOrange }}>
                  <Edit />
                </IconButton>
                <Button sx={{ background: theme.palette.customColors.lightOrange, color: theme.palette.primary.contrastText }}>
                  Publish
                </Button>
                <IconButton sx={{ color: theme.palette.customColors.lightOrange }}>
                  <Delete />
                </IconButton>
              </span>
            )}
          </div>
        }
      />
      <CardContent className={classes.courseDesc}>
        <img className={classes.imageCard} src={imageUrl} title={values.courseData?.name || 'Course'} />
        <Typography variant="body1" className={classes.courseTypo}>
          {values.courseData?.description || 'No description available'}
        </Typography>
      </CardContent>
      <Card sx={{ background: '' }} className={classes.addLesson}>
        <Box component={'div'}>
          <Typography variant='h6'>Lessons</Typography>
          <Typography variant='p'>5 Lessons</Typography>
        </Box>
        <IconButton onClick={addLessonButton}><Add /> New Lesson</IconButton>
      </Card>
      <List className={classes.lessonList}>
        {values.courseData.lessons && values.courseData.lessons.map((lesson, index) => (
          <span key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={lesson.title} />
            </ListItem>
            <Divider variant='inset' component={'li'} />
          </span>
        ))}
      </List>
    </Card>
  );
}
