import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { deleteCourse, enrollmentStats, read, update } from './api-course';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth/auth-helper';
import { useTheme } from '@emotion/react';
import { useStyles } from '../core/Menu';
import { Add, Delete, Edit, People, TaskAlt, TaskAltTwoTone } from '@mui/icons-material';
import NewLesson from './NewLesson';
import DeleteCourse from './DeleteCourse';

export default function Course() {
  const [values, setValues] = useState({
    error: '',
    courseData: {
      _id: '',
      name: 'Loading...',
      instructor: { _id: '', name: 'Unknown' },
      category: 'Uncategorized',
      description: 'No description available',
      lessons: []
    },
  });
  const [open, setOpen] = useState(false);
  const [stats,setStats]=useState({
    totalEnrolled:0,
    totalCompleted:0
  })
  const [delopen, setDelOpen] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const { courseId } = useParams();
  const { auth } = useAuth();
  const theme = useTheme();
  const classes = useStyles();
  const imageUrl = `/api/course/photo?courseId=${values.courseData._id}`;

  const addLesson = (course) => {
    setValues({ ...values, courseData: course });
  };

  const handleDelete = () => {
    setDelOpen((prev) => !prev);
  };

  const addLessonButton = () => {
    setOpen((prev) => !prev);
  };

  const clickPublish = () => {
    if (values.courseData.lessons.length > 0) {
      console.log('what')
      setOpenPublish(true);
    }
  };

  const removeCourse = () => {
    deleteCourse({ courseId: courseId }, { t: auth.token })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, courseData: data });
        }
      });
  };

  const publish = () => {
    let courseData = new FormData();
    courseData.append('published', true);
    
    update({ courseId: courseId }, { t: auth.token }, courseData).then((data) => {
      if (data && data.error) {
        console.log('errornouse',data.error)
        setValues({ ...values, error: data.error });
      } else {
        console.log('haileamare degefaw')
        setValues({ ...values, courseData: { ...values.courseData, published: true } });
        setOpenPublish(false);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setDelOpen(false);
    setOpenPublish(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ courseId }, { t: auth.token }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, courseData: data });
      }
    });

    return () => abortController.abort();
  }, [courseId]);

  useEffect(()=>{
    const abortController =new AbortController()
    const signal=abortController.signal

    enrollmentStats({courseId:courseId},{
      t:auth.token
    },signal).then((data)=>{
      if(data && data.error){
        setValues({...values,error:data.error})
      }else{
        console.log('enrolledstat',data)
        setStats(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  },[courseId])
  
  return (
    <Card className={classes.cardCourse} data-label="cardCourse">
      <Dialog open={openPublish} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Publish Course
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Publishing your course will make it live to students for enrollment.
          </Typography>
          <Typography variant="body1">
            Make sure all lessons are added and ready for publishing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={publish} color="secondary" variant="contained">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      {open && auth.user._id === values.courseData.instructor._id && (
        <NewLesson courseId={courseId} addLesson={addLesson} setOpen={setOpen} />
      )}
      {delopen && <DeleteCourse course={values.courseData} onRemove={removeCourse} setDelOpen={setDelOpen} />}
      <CardHeader
        className={classes.cardHeader}
        title={
          <Typography variant="h6" className={classes.titleTypo}>
            {values.courseData.name}
          </Typography>
        }
        subheader={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to={`/api/user/${values.courseData.instructor._id}`} style={{ textDecoration: 'none', marginTop: theme.spacing(1) }}>
              By <span style={{ fontSize: theme.spacing(2.4), fontFamily: 'Roboto san-serif', color: theme.palette.customColors.lightOrange }}>
                {values.courseData.instructor.name}
              </span>
            </Link>
            <Typography variant="h5" style={{ fontFamily: 'Roboto sans-serif', background: 'rgba(0,0,0,0.5)', width: '200px', filter: 'blur(100%)' }}>
              {values.courseData.category}
            </Typography>
          </div>
        }
        action={
          <div className={classes.butonCon}>
            {auth.user._id && auth.user._id === values.courseData.instructor._id && (
              <span>
                <IconButton sx={{ color: theme.palette.customColors.lightOrange }} component={Link} to={`/teach/course/edit/` + courseId}>
                  <Edit />
                </IconButton>
                {!values.courseData.published ? (
                  <>
                    <Button sx={{ background: theme.palette.customColors.lightOrange, color: theme.palette.primary.contrastText }} onClick={clickPublish}>
                      {values.courseData.lessons.length === 0 ? 'Add at least 1 lesson to publish' : 'Publish'}
                    </Button>
                    <IconButton sx={{ color: theme.palette.customColors.lightOrange }} onClick={handleDelete}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  <div style={{display:'inline-flex',gap:theme.spacing(1),marginLeft:theme.spacing(1)}}>
                   {stats.totalEnrolled}<People/>
                   {stats.totalCompleted}<TaskAlt/>
                  <Button color="primary" variant="outlined" >
                    Published
                  </Button>
                 </div>
                )}
              </span>
            )}
          </div>
        }
       
      />
      <CardContent className={classes.courseDesc}>
        <CardMedia component="img" image={imageUrl} title={values.courseData.name} style={{ height: '300px', width: '120%' }} />
        <Typography variant="body1" className={classes.courseTypo}>
          {values.courseData.description}
        </Typography>
      </CardContent>
      <Card sx={{ background: '' }} className={classes.addLesson}>
        <Box component="div">
          <Typography variant="h6">Lessons</Typography>
          <Typography variant="p">{values.courseData.lessons.length } Lessons</Typography>
        </Box>
      {auth && auth.user._id===values.courseData.instructor._id && ( <IconButton onClick={addLessonButton}>
          <Add /> New Lesson
        </IconButton>)}
      </Card>
      <List className={classes.lessonList}>
        {values.courseData.lessons.map((lesson, index) => (
          <span key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={lesson.title} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </span>
        ))}
      </List>
    </Card>
  );
}
