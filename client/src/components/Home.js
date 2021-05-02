import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import guru from '../guru.png'
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    image :{
        width:"99%",
        marginTop: '10px',
        justifyContent: "center",
        alignItems: "center",
        height: "70vh"
    },
    title: {
        fontSize:'35px',
        color: '#c4410c',
        textAlign:'center'
    },
    title1: {
        fontSize:'35px',
        color: '#c4410c',
        textAlign:'center'
    },
    root1: {
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    btn: {
        marginTop:theme.spacing(2),
        borderRadius: 20,
        fontSize: '18px'
    }

}));

function Home(props) {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} >
            <Grid className={classes.root1} item xs={12} md={6}>
                <Typography className={classes.title}>
                    A PORTAL to match you with teacher for 
                </Typography>
                <Typography className={classes.title1}>
                    <MenuBookIcon fontSize="large" /> FREE EDUCATION
                </Typography>
                <Button className={classes.btn} variant="contained" color="secondary" href="/register">
                    Register
                </Button>
            </Grid>
            <Grid item md={6}>
                <img className={classes.image} src={guru}></img>
            </Grid>
        </Grid>
    );
}

export default Home;