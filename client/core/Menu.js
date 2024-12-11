import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles'
import HomeIcon from '@mui/icons-material/Home'
import { School } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearJWT, isAuthenticated, updateUser } from '../auth/auth-helper';

//import { keyframes } from '@mui/system';
//import theme from '../theme'



export const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.customColors.lightGreen,
    display: 'flex !important',
    color: 'white',
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
  }
}))

export default function Menu() {
  const location=useLocation()
  const navigate=useNavigate()
  const classes = useStyles()
  const handleSignout=()=>{
    clearJWT(()=>{
      navigate('/',{replace:true})
       
    })
  }
 // console.log('auhth',isAuthenticated().user._id)
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
        {isAuthenticated() && updateUser().educator(<IconButton className={classes.navButtons}>
          <School />TEACH
        </IconButton>)}
        {isAuthenticated() && (<span style={{display:'flex',flexDirection:'row'}}>
        <Button className={classes.navButtons} component={Link} to={'/user/'+isAuthenticated().user._id}>My Profile</Button>
        <Button className={classes.navButtons} onClick={handleSignout}>
          Sign out
        </Button> 
        </span>)}

        {!isAuthenticated() && (<span> <Button className={classes.navButtons} component={Link} to='/signin'>
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