import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles'
import HomeIcon from '@mui/icons-material/Home'
import { School } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { clearJWT, isAuthenticated, updateUser } from '../auth/auth-helper';
import { useAuth } from '../auth/auth-helper';
//import { keyframes } from '@mui/system';
//import theme from '../theme'



export const useStyles = makeStyles((theme) => ({
  '@global':{
     '@import': [ "url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')"],
  },
  appBar: {
    background: theme.palette.customColors.lightGreen,
    display: 'flex ',
    color: 'white',
    zIndex:1,
    padding: '.6rem 1rem',
    fontSize: '1rem',
    margin: 'auto',
    position: 'fixed',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  hiddenScrollBar:{
    height:'100vh',
    background:'blue',
    '&::-webkit-scrollbar':{
      display:'none'
    },
    '-ms-overflow-style':'none',
    'scrollbar-width':'none'
  },
  toolBar: {
    padding: '0 1rem',
    margin: '0',
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem'
  },
  navBar: {
    flex: '1',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
  },
  navButtons: {
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    textWrap:'nowrap'
  },
  specialButton: {
    '&[data-label="special"]': {
      background: 'red',
      margin: 'auto',
      marginLeft: '0 !important'

    }
  },
  typoText: {
    marginBottom: theme.spacing(5),
    width: '7rem',
    textWrap: 'nowrap',
    animation: '$typoAnim 5s infinite',
    //textShadow:'0px 0px 10px #fff200,0px 0px 20px #fff200 ,0px 0px 40px #fff200 '
  },
  '@keyframes typoAnim': {
    from: { transform: 'rotateaY(0deg)', transformOrigin: 'center center', color: theme.palette.customColors.lightGreen },
    to: { opacity: 1, transformOrigin: 'center center', transform: 'rotateY(360deg)', color: theme.palette.customColors.red, }
  },
  textField: {
    marginBottom: theme.spacing(3),
    height: '6rem',
    padding: '1em 5em',

  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(15)
  },
  buttons:props=> ({
    position:'relative',
    zIndex:'1',
    background: theme.palette.customColors.gradientGreen,
    color: theme.palette.primary.contrastText,
    width:'16em',
    padding:'1em 2em',
    borderRadius:'3rem',
    overflow:'hidden',
    '&::before':{
      position:'absolute',
      content:'""',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      color:'white',
      height:'1px',
      width:'1px',
      opacity:1,
      borderRadius:'50%',
      top:props.height +'px',
      left:props.width +'px',
      background:theme.palette.primary.contrastText
    },
    '&:hover':{
      '&::before':{
        background:theme.palette.primary.contrastText,
        width:'200%',
        opacity:0,
        color:'white',
        zIndex:'100px',
        height:'200%',
        top:'50%',
        left:'50%',
        borderRadius:'3rem',
        transition:'all 1s ease',
        transform:'translate(-50%,-50%)'
      }
    }
  }),
  messageBox:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:theme.spacing(1),
  },
  paperCard:{
    position:'fixed',
    right:'',
    top:theme.spacing(20),
    marginLeft:theme.spacing(10),
    paddingLeft:theme.spacing(10),
    height:'70vh',
    background:'white',
   // padding:theme.spacing(2),
    width:'80%',
    overflow:'auto',
    '&::-webkit-scrollbar':{
      width:'1rem',
    },
    '&::-webkit-scrollbar-thumb':{
      backgroundColor:'#888',
      borderRadius:theme.spacing(3),

    },
    '&[data-label="profileCard"]':{
      height:'100vh',
      top:theme.spacing(10),
      marginLeft:theme.spacing(0),
      paddingLeft:theme.spacing(2),
      width:'100%'
    }
  },
  list:{
   flex:1,
   padding:theme.spacing(1)
  },
  linkUsers:{
    textDecoration:'none',
    boxSizing:'border-box',
    width:'85%',
    '&:hover':{
     // borderStyle:'solid',
      borderColor:theme.palette.customColors.lightGreen,
      borderWidth:theme.spacing(.4),
      borderRadius:theme.spacing(1),
      transform:'scale(1.2)',
      marginLeft:theme.spacing(3)
    }
  },
  bar:{
    background:'red',
    color:'red',
    alignSelf:'center'
  },
  actions:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center'
  },
  cardCourse:{
    zIndex:10,
    position:'absolute',
    width:'100%',
    top:theme.spacing(0),
    paddingLeft:theme.spacing(1.5),
    paddingRight:theme.spacing(1.5),
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridTemplateRows:'auto auto auto auto',
    gridTemplateAreas:' "cardHeader cardHeader cardHeader " "courseDesc courseDesc courseDesc" "addLesson addLesson addLesson" "lessonList lessonList lessonList"',
    gap:theme.spacing(1),
   
  },
  addLesson:{
    gridArea:'addLesson',
    display:'grid',
    background:'',
    gridTemplateColumns:'1fr 200px',
    padding:theme.spacing(1),
    maxHeight:'80px',
    boxSizing:'border-box',
    position:'relative',
    borderTop:'solid 1px rgba(0,0,0,0.5)',
    boxShadow:'0 -4px 6px -4px rgba(0, 0, 0, 0.5)',
    '& div':{
      display:'flex',
      flexDirection:'column',
      gap:'.6rem'
    },
    '& a':{
         background:'rgba(0,0,0, .5)',
         textWrap:'nowrap',
         borderRadius:'0'
         
    }
    
  },
  cardHeader:{
    paddingTop:'0px',
    paddingLeft:'0px',
    gridArea:'cardHeader',
    marginTop:theme.spacing(2),
  },
  titleTypo:{
    fontFamily:"Roboto fantasy",
    fontWeight:'bold',
    fontSize:theme.spacing(3.5)
  },
  buttonCon:{
    gridArea:'buttonCon',
    background:'orange',
  },
  imageCard:{
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPositionX:'center',
    backgroundPosition:'start',
    maxHeight:'250px',
    width:'100%',
    background:'red',
    margin:'0',
    background:'red',
    borderRadius:theme.spacing(1),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    [theme.breakpoints.down('sm')]:{
        gridColumn:'1',
        gridRow:'1',
        order:2
    },
    [theme.breakpoints.down('md')]:{
      maxHeight:'200px',
      gridColumn:'1/2',
      gridRow:'1/2'
    }      
  },
  courseDesc:{
    margin:`${theme.spacing()} ${theme.spacing(0)}`,
    padding:`${theme.spacing()} ${theme.spacing(20)} ${theme.spacing(20)} ${theme.spacing(2)}`,
    gridArea:'courseDesc',
    height:'250px',
    background:'',
    margin:'0',
    display:'grid',
    gap:theme.spacing(10),
    gridTemplateColumns:'300px 1fr',
    justifyItems:'start',
    [theme.breakpoints.down('sm')]:{
      gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',
      gridTemplateRows:'auto auto',
      height:'auto',
      maxHeight:'200px',
      padding:'0 auto',
      gap:theme.spacing(3),
      
    },
    [theme.breakpoints.down('md')]:{
      gap:theme.spacing(5),
      height:'auto',
      maxHeight:'400px'
    }
  },
  courseTypo:{

    [theme.breakpoints.down('md')]:{
      fontSize:theme.spacing(1.5),
      fontFamily:'Roboto san-serif',
      textWrap:'wrap',
      gridColumn:'2/3',
      background:'red',
      gridRow:'1/2',
      width:'auto',
      height:'auto'
    },
    [theme.breakpoints.down('sm')]:{
      fontSize:theme.spacing(1.5),
  
    },
  },
  imageList:{
    display: 'flex',
    flexWrap:'wrap',
    gap: "1rem",
    background: "",
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column-reverse'
    }
    
  },
  listImage:{ 
     marginBottom: '0',
     flex:'1' ,
     aspectRatio:2/1,
     [theme.breakpoints.down('sm')]:{
      height:'80px'
     }
  },
  listText:{
    marginTop: '0',
    flex:'3',
    [theme.breakpoints.down('sm')]:{
      gridColumn:'auto-fit',
      background:'orange',
      '&::-webkit-scrollbar':{
      width:'1rem',
      color:'red'
    },
    '&::-webkit-scrollbar-thumb':{
      backgroundColor:'red',
      borderRadius:theme.spacing(3),

    },
    },
  },
lessonList:{
  gridArea:'lessonList',
  background:'',
  height:'250px',
  maxHeight:'250px'
},
flex:{
  display:'flex',
  gap:theme.spacing(2),
  paddingTop:theme.spacing(2),
  [theme.breakpoints.down('sm')]:{
    flexDirection:'column',
    
  }
},
cardImage:{
width:'390px',
height:'300px',
objectFit:'contain'
},
details:{
 //height:'300px',
 width:'90%',
 [theme.breakpoints.down('sm')]:{
  height:'auto',
   width:'100%'
 },
 '& .MuiTextField-root':{
  '& fieldset':{
    border:'none',
    borderBottom:'solid 1px black'
  },
  '& label':{
    color:'red',
    //transform:'none'
    transform:'translate(14px,-6px) scale(1)'
  },
  '& .MuiOutlinedInput-root':{
      padding:theme.spacing(4),
      
  },
    width:'100%',
    marginBottom:theme.spacing(3)
 }
},

editCourse:{
   padding:'0',
   '& .MuiTextField-root':{
    height:'60px',
    marginBottom:theme.spacing(1.4),
    marginTop:theme.spacing(0.7),
    marginRight:theme.spacing(0),
    width:'90%',
    '& .MuiOutlinedInput-root':{
      padding:theme.spacing(1)
    },
     '& fieldset':{
      border:'none',
      borderBottom:'solid 1px black',
      padding:theme.spacing(3)
     },
     '& label':{
      padding:'0',
      fontSize:theme.spacing(1.8),
      color:'red',
      top:'0',
      transform:'none'
    },
    },
  },
  lessonsList:{
    '& .MuiTextField-root':{
      '& fieldset':{
         border:'none',
         borderBottom:'solid 1px black',
      },
      '& label':{
        color:'black',
        fontSize:theme.spacing(2.4)
      },
    },
    '& .MuiOutlinedInput-root':{
      paddingBottom:theme.spacing(0.1)
    }
  }
}))

export default function Menu() {
  const {auth,authenticate,clearJWT,updateUser}=useAuth()
  const location=useLocation()
  const navigate=useNavigate()
  const classes = useStyles()
  const handleSignout=()=>{
    clearJWT(()=>{
      navigate('/',{replace:true})
       
    })
  }

  return (
    <AppBar className={classes.appBar} >
      <Toolbar className={classes.toolBar} component='h3'>
        MERN Classroom
      </Toolbar>
      <div className={classes.navBar}>
        <IconButton className={`${classes.navButtons} ${classes.specialButton}`}
          data-label="special"
          component={Link}
          to='/'>
          <HomeIcon />
        </IconButton>
        <Button className={classes.navButtons} component={Link} to='/users'>
          users
        </Button>
        {auth && auth.user.educator && (<IconButton className={classes.navButtons} component={Link} to='/seller/courses'>
          <School />TEACH
        </IconButton>)}
        {auth && (<span style={{display:'flex',flexDirection:'row'}}>
        <Button className={classes.navButtons} component={Link} to={'/user/'+auth.user._id}>My Profile</Button>
        <Button className={classes.navButtons} onClick={handleSignout}>
          Sign out
        </Button> 
        </span>)}

        {!auth && (<span> <Button className={classes.navButtons} component={Link} to='/signin'>
          Sign in
        </Button>
          <Button className={classes.navButtons} component={Link} to='/signup'>
            Sign up
          </Button></span>)
        }
      </div>
    </AppBar>
  )
}