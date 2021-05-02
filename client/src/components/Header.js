import React,{useState,useEffect} from 'react'
import { AppBar, Toolbar, Grid,IconButton, makeStyles} from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link, withRouter} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {call} from '../api'
import MenuBookIcon from '@material-ui/icons/MenuBook';

// for showing active link on navbar
const isActive = (history, path) => {
    
    if (history.location.pathname == path)
      return {color: '#ff4081'}
    else
      return {color: 'rgba(0, 0, 0, 0.54)'}
}


const useStyles = makeStyles(theme => ({
    
    root: {
        backgroundColor: '#fff',
        [theme.breakpoints.down('md')]: {
         alignItems: 'center',
        },
    },
    title: {
        flexGrow: 1,
        // display: 'none',
        color: '#c4410c',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
        fontWeight: 2000
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default withRouter(function Header({history}) {

    const [type, setType] = useState('');
    const classes = useStyles();

    const signOut = () => { 
        
        localStorage.removeItem('jwtToken')
        window.location.href='/';
    }

    useEffect(() => {
   
        call('get','auth/profile').then((data) => {
    
            setType(data.type)
    
        }).catch((err)=>{
            
            console.log(err);
        })
        
    },[localStorage.jwtToken])

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                        <Grid item>
                            <Typography className={classes.title} variant="h5" noWrap>
                                <MenuBookIcon/> SamVedah
                            </Typography>
                        </Grid>
                        <Grid item sm></Grid>
                    
                    <Grid item>
                        
                        
                        {type && <Link to='/'>
                            <IconButton style={isActive(history, "/")}>
                                    <HomeIcon fontSize="medium"/>
                            </IconButton>
                        </Link>}

                        {type && <Link to='/profile'>
                            <IconButton style={isActive(history, "/profile")}>
                                    <AccountCircleIcon fontSize="medium"/>
                            </IconButton>
                        </Link>}
                        

                        {type==="mentor" && <Link to='/search'>
                            <IconButton style={isActive(history, "/search")}>
                                    <GroupAddIcon fontSize="medium"/>
                            </IconButton>
                        </Link>}


                        {type && <IconButton onClick={signOut}>
                            <PowerSettingsNewIcon fontSize="medium" />
                        </IconButton>}

                    </Grid>

                </Grid>

            </Toolbar>

        </AppBar>
    )
})