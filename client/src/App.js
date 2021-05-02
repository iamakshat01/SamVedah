import React from 'react';
import './App.css';
import {Route, Switch,BrowserRouter} from 'react-router-dom'
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "./components/Header";
import Register from './components/Register';
import SignIn from './components/Signin';
import Profile from './components/Profile'
import {setToken} from './api'
import UserFront from './components/UserFront';
import Mentee from './components/Mentee';
import Home from './components/Home';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    // paddingLeft: '320px',
    width: '100%'
  }
})


if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
}


function App() {

  
  const classes = useStyles();


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <SideMenu /> */}
        <div className={classes.appMain}>
          <Header/>
          <Switch>
            <Route exact path="/" component={UserFront} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={Mentee}/>
          </Switch>
          
        </div>
        <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;