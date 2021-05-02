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
import Divider from '@material-ui/core/Divider'
import Notification from './Notification'


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
    marginTop: 10
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
  }

}));

function SimpleCard(props) {
  
  
  const handleAccept = () =>{
    
      call('post','pool/accept',{_id:props.user.x._id,subject:props.user.subject._id}).then((data) => {
  
        props.setNotify({
          isOpen: true,
          message: 'Mentee Accepted!',
          type: 'success'
        })  
  
      }).catch((err)=>{
          
          console.log(err);
      })
      
   
  }
  const classes = useStyles();
        return (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  Mentee
                </Typography>
                <Divider/>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.pink}>
                        <Person />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.x.name}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar >
                    <Avatar className={classes.green}>
                        <EmailIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.x.email}/>
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
                    <Button size="large" color="primary" onClick={handleAccept}>
                       Accept
                    </Button>
                </ListItem>
              </CardActions>
            </Card>
          );
  
}


export default function Search(props) {

    const [data,setData]=useState([])
    const [notify, setNotify] = useState({isOpen:false,message:'',type:''})
    const classes = useStyles()


    useEffect(() => {
   
        call('get','pool/search').then((data) => {
    
            setData(data)
    
        }).catch((err)=>{
            
            console.log(err);
        })
        
    },[notify.isOpen])

    

    const menu = data.map(user => {
        return (
            
                <Grid key={user._id} item>
                  <SimpleCard className={classes.paper} user={user} notify={notify} setNotify={setNotify}/>
                </Grid>
        );
    });
    
    return (
        
        <Grid container className={classes.root1} spacing={2}>
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {menu}
                </Grid>
            </Grid>
        </Grid>
        
    );
}