import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {call} from '../api'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'
import { green, pink, blue } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import EmailIcon from '@material-ui/icons/Email';
import SubjectIcon from '@material-ui/icons/Subject';
import {Redirect} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import ClassIcon from '@material-ui/icons/Class';
import PhoneIcon from '@material-ui/icons/Phone';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme)=>({
  
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    color: theme.palette.primary.dark,
   
  },
  pos: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
  },
  root1: {
    flexGrow: 1,
    marginTop: theme.spacing(5),

  },
  paper: {
    height: 140,
    width: 100,
    alignItems: 'center'
  },
  control: {
    padding: theme.spacing(2),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  actions: {
    margin: 'auto',
    textDecoration: 'none'
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

}));

function SimpleCard(props) {
  
  const classes = useStyles();
  
  if(props.type==="mentor")
    {
        return (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Mentee
                </Typography>
                <Divider/>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.pink}>
                        <Person />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.mentee.name}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.green}>
                        <ClassIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.mentee.class}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.blue}>
                        <SubjectIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.subject.name}/>
                </ListItem>
              </CardContent>
              <Divider variant="middle"/>
              <CardActions className={classes.action}>
                <ListItem>
                    <Button size="large" color="primary" aria-label="large outlined primary">
                        <EmailIcon style={{ color: blue[600] }} fontSize="small" /><a style={{ textDecoration: 'none' }} href={"mailto:"+props.user.mentee.email}> Email</a>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button size="large" color="primary" aria-label="large outlined primary">
                      <PhoneIcon style={{ color: blue[600] }} fontSize="small" /><a style={{ textDecoration: 'none' }}  href={"tel:+91"+props.user.mentee.phone}> Call</a>
                    </Button>
                </ListItem>
              </CardActions>
            </Card>
          );
    }
  else
    {
        return (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  Mentor
                </Typography>
                <Divider/>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.pink}>
                        <Person />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.mentor.name}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.green}>
                        <EmailIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.mentor.email}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.blue}>
                        <SubjectIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.subject.name}/>
                </ListItem>
              </CardContent>
              <Divider variant="middle"/>
              <CardActions className={classes.action}>
                <ListItem>
                      <Button size="large" color="primary" aria-label="large outlined primary">
                          <EmailIcon style={{ color: blue[600] }} fontSize="small" /><a style={{ textDecoration: 'none' }} href={"mailto:"+props.user.mentor.email}> Email</a>
                      </Button>
                  </ListItem>
                  <ListItem>
                      <Button size="large" color="primary" aria-label="large outlined primary">
                        <PhoneIcon style={{ color: blue[600] }} fontSize="small" /><a style={{ textDecoration: 'none' }}  href={"tel:+91"+props.user.mentor.phone}> Call</a>
                      </Button>
                  </ListItem>
              </CardActions>
            </Card>
          );
    }
  
}


export default function UserFront() {
    
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [type, setType] = useState('');
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    
    const classes = useStyles();
    
    useEffect(() => {
   
      call('get','auth/profile').then((data) => {
  
          setType(data.type)
  
      }).catch((err)=>{
          
          setRedirectToSignin(true)  
      })
      
    },[])

    useEffect(() => {
        
        call('get','pool/'+type).then((alldata) => {
    
            setData(alldata)
            setLoading(false)
    
        }).catch((err)=>{
    
            console.log(err);
        })
        
    },[type])

    if (redirectToSignin) {
        return <Redirect to='/home'/>
    }

    if(loading) {

      return  <div className={classes.spinner}>
                <CircularProgress
                  size={40}
                />
              </div>
    }
    const menu = data.map(user => {
        return (
            
                <Grid key={user._id} item>
                  <SimpleCard className={classes.paper} user={user} type={type}/>
                </Grid>
        );
    });
    
    return (
        <Grid container className={classes.root1} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {menu}
                </Grid>
            </Grid>
        </Grid>
        
    );
}