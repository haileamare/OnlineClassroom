import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import CompletedIcon from '@mui/icons-material/CheckCircle';
import InProgressIcon from '@mui/icons-material/HourglassEmpty';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    imageList: {
        margin: theme.spacing(4),
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(2),
            marginTop: theme.spacing(6)
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
        [theme.breakpoints.down('sm')]: {
            height: '200px',
            width: '100%'
        }
    },
}));
export default function Enrollments({ enrolled }) {
    const classes = useStyles()
    console.log('enroollled',enrolled)
    return (
        enrolled?.length > 0 ? (enrolled.map((enroll, i) => (
            <div className={classes.container}>

                <ImageList
                    className={classes.imageList}
                    cols={3}
                    //gap={isSmallDevice ? parseInt(theme.spacing(2)) :parseInt(theme.spacing(2))}
                    rowHeight={300}
                >
                    <ImageListItem key={i}

                    >
                        <Link to={"/learn/" + enroll._id}>
                            <img
                                className={classes.image}
                                src={`/api/course/photo?courseId=${enroll.course._id}`}
                                alt={enroll.course.name}
                                loading='lazy'
                            />
                        </Link>
                        <ImageListItemBar
                            title={<Link to={"/learn/" + enroll._id}>{enroll.course.name}</Link>}
                            actionIcon={
                                <div>
                                    {enroll.completed ? (
                                        <CompletedIcon color="secondary" />
                                    ) : (
                                        <InProgressIcon />
                                    )}
                                </div>
                            }
                        />
                    </ImageListItem>
                </ImageList></div>
        ))) : <div>No Enrolled Courses{enrolled?.length}</div>
    )
}

