import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-helper";
import PropTypes from 'prop-types';
import Enroll from './Enroll';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  imageList: {
    margin: theme.spacing(4),
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      marginTop:theme.spacing(6)
    },
    '& .MuiImageListItem-root': {
      width: '100%',
      height: 'auto',
    },
    '& .MuiImageListItemBar-root': {
      width: '100%',
      color: 'white',
    },
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  container: {
    width: '100%',
    height: '100vh',
    padding: theme.spacing(1),
    marginTop: theme.spacing(6),
  },
  image: {
    width: '100%',
    height: '300px', // Fixed height for all images
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]:{
      height:'200px',
      width:'100%'
    }
  },
}));

export default function Courses({ Courses,common }) {
  const { auth } = useAuth();
  const classes = useStyles();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
 
  console.log('coursess',Courses)
  // Check if courses is an array
  if (!Array.isArray(Courses)) {
   // console.error('Courses is not an array:', courses);
    return <div>Error: Courses is not an array.</div>;
  }

  // Check if courses array is empty
  if (Courses.length === 0) {
    console.warn('Courses array is empty.');
    return <div>No courses available.</div>;
  }

  const findCommon=(course)=>{
    console.log('white')
    if(common?.length==0) return true
    console.log('nigga')
    return common?.find((enrolled)=>{
      return enrolled.course._id===course._id?false:true
    })
  }
  return (
    <div className={classes.container}>
      <ImageList
        className={classes.imageList}
        cols={isSmallDevice ? 1 : 3}
        gap={isSmallDevice ? parseInt(theme.spacing(2)) :parseInt(theme.spacing(2))}
        rowHeight={300}
      >
        {Courses.map((course) => (
         
            findCommon(course) &&
            ( <ImageListItem key={course._id}>
              
              <Link to={'/teach/course/' + course._id}>
                <img
                  className={classes.image}
                  src={`/api/course/photo?courseId=${course._id}`}
                  alt={course.name}
                  loading='lazy'
                />
              {course.name}
              </Link>
              <ImageListItemBar
                className={classes.imageListItemBar}
                title={<Link to={'/teach/course/' + course._id}>{course.name}</Link>}
                subtitle={<span>{course.category}</span>}
                actionIcon={
                  auth ? (
                    <Enroll courseId={course._id} />
                  ) : (
                    <Link to={'/signin'}>Sign in to Enroll</Link>
                  )
                }
              />
            </ImageListItem>)
        ))}
      </ImageList>
    </div>
  );
}

Courses.propTypes = {
  Courses: PropTypes.array.isRequired,
};
