import React, { useEffect, useState } from 'react';
import Courses from '../course/Courses';
import { listPublished } from '../course/api-course';
import { listEnrolled } from '../enrollment/enrollment-api';
import { useAuth } from '../auth/auth-helper';
import Enrollments from '../enrollment/Enrollments';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: '#ffffff',
  },
  extraTop: {
    marginTop: theme.spacing(12),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
  },
  tile: {
    textAlign: 'center',
  },
  image: {
    height: '100%',
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left',
  },
  enrolledTitle: {
    color: '#efefef',
    marginBottom: 5,
  },
  action: {
    margin: '0 10px',
  },
  enrolledCard: {
    backgroundColor: '#616161',
  },
  divider: {
    marginBottom: 16,
    backgroundColor: 'rgb(157, 157, 157)',
  },
  noTitle: {
    color: 'lightgrey',
    marginBottom: 12,
    marginLeft: 8,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listPublished(signal).then((data) => {
      if (data && data.error) {
        console.log('Error:', data.error);
      } else {
        setCourses(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    listEnrolled({ t: auth.token }).then((data) => {
      if (data && data.error) {
        console.log('Error:', data.error);
      } else {
        setEnrolled(data);
      }
    });
  }, [auth.token]);
   
  return (
    <div className={classes.extraTop}>
      {auth.user && (
        <Card className={`${classes.card} ${classes.enrolledCard}`}>
          <Typography variant="h6" component="h2" className={classes.enrolledTitle}>
            Courses you are enrolled in
          </Typography>
          {enrolled?.length>0 ? (
            <Enrollments enrolled={enrolled} />
          ) : (
           
            <Typography variant="body1" className={classes.noTitle}>No courses.</Typography>
          )}
        </Card>
      )}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {courses.length !== 0 && courses.length !== enrolled?.length ? (
          <Courses Courses={courses} common={enrolled} />
        ) : (
          <Typography variant="body1" className={classes.noTitle}>No new courses.</Typography>
        )}
      </Card>
    </div>
  );
}
