import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'
import {Redirect} from 'react-router-dom'
import {call} from '../api'
import { green, pink, blue } from '@material-ui/core/colors';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import ClassIcon from '@material-ui/icons/Class';
import HistoryIcon from '@material-ui/icons/History';
import Button from '@material-ui/core/Button';
import SubjectIcon from '@material-ui/icons/Subject';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Notification from './Notification'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  
  root: theme.mixins.gutters({
    maxWidth: 700,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.dark
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  paper: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#e3641b",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  subjects: {
    paddingLeft: theme.spacing(2)
  },
  spinner: {
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop: '5px',
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }

}))

export default function Profile() {
  
  const classes = useStyles()
  const [loading,setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [sub, setSub] = useState([])
  const [ssub, setsSub] = useState({_id:''});
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const [notify, setNotify] = useState({isOpen:false,message:'',type:''})

  // seleted subject from list to add 
  const handleChange = (event) => {
    setsSub({_id:event.target.value});
  };

  // adding the subject into user profile
  const subClick = () => {
    
      call('post','sub/user/add',ssub).then((data) => {
  
          setsSub({_id:''})
          setNotify({
            isOpen: true,
            message: 'Subject Added Successfully',
            type: 'success'
        })
  
      }).catch((err)=>{
          
          setNotify({
              isOpen: true,
              message: 'Subject Addition Failed',
              type: 'error'
          })
          
      })
      
  }

  // for fetching user profile
  useEffect(() => {
   
    call('get','auth/profile').then((data) => {

      setLoading(false);  
      setUser(data)

    }).catch((err)=>{
        
        setRedirectToSignin(true)
    })
    
   },[ssub._id])

   // for fetching all the subjects added by admin
   useEffect(() => {
   
    call('get','sub/').then((data) => {

        setSub(data.allsub)

    }).catch((err)=>{

        setNotify({
            isOpen: true,
            message: 'Fetch Failed',
            type: 'error'
        })
        
    })
    
   },[])

    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    if(loading) {

      return  <div className={classes.spinner}>
                <CircularProgress
                  size={40}
                />
              </div>
    }
    return (
      <Paper className={classes.paper} elevation={4}>
        <Notification
                    notify={notify}
                    setNotify={setNotify}
        />
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        
        <List dense>
          <Divider variant="middle"/>
          <ListItem>
            <ListItemAvatar >
              <Avatar className={classes.pink}>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name}/>
          </ListItem>
          

          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.green}>
                <EmailIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.email}/>
          </ListItem>

          
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.blue}>
                <PhoneIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.phone}/>
          </ListItem>

          
          {user.class && (<ListItem>
            <ListItemAvatar>
              <Avatar className={classes.pink}>
                <ClassIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.class}/>
          </ListItem>)}

          
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.green}>
                <HistoryIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ (
              new Date(user.created)).toDateString()}/>
          </ListItem>
          
          
          <ListItem className={classes.subjects}>
            <ListItemAvatar>
              <Avatar className={classes.pink}>
                <SubjectIcon/>
              </Avatar>
            </ListItemAvatar>
            
            <Grid className={classes.subjects} container alignItems="center">
            {user.subjects && user.subjects.map(
                            item => (
                              <Grid item key={item._id}><Button color="primary" aria-label="large outlined primary button ">{item.name}</Button></Grid>
                            )
              )}
            </Grid>

          </ListItem>

          <ListItem>                  
            <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Subject</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={ssub._id}
              onChange={handleChange}
            > 
              {sub && sub.map(
                              item => (
                                  <MenuItem value={item._id}>{item.name}</MenuItem>
                                  
                              )
              )}
              
            </Select>
            <Button color="primary" aria-label="large outlined primary" onClick={subClick}>Add</Button>
          </FormControl>
         </ListItem>
         
        </List>
      </Paper>
    )
}