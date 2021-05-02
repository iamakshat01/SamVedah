import React, { useState } from 'react'
import { Grid, } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {Button, makeStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {call,setToken} from '../api'
import Notification from './Notification'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1)
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const initialFValues = {

    email: '',
    password:'',

}

export default function SignIn(props) {
    
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({isOpen:false,message:'',type:''})

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        validate({ [name]: value })
    }


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {

            call('post','auth/login',values).then((data) => {

                  setValues(initialFValues)
                  
                  setToken(data.token);

                  setNotify({
                    isOpen: true,
                    message: 'Signed In Successfully',
                    type: 'success'
                  })
                  props.history.push('/');
                
            }).catch((err)=>{
                
                console.log(err);
                setNotify({
                    isOpen: true,
                    message: 'Sign In Failed',
                    type: 'error'
                })
               
            })
            
        }
    }


    const classes = useStyles();
  


    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>

                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error:true,helperText:errors.email})}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        {...(errors.password && {error:true,helperText:errors.password})}
                    />
                    

                </Grid>
                <Grid item xs={12}>
                   
                    <div mt={3}>
                        <Button
                            variant="contained"
                            size="large"
                            margin="normal"
                            color="primary"
                            type="submit"
                            text="Submit"
                            classes={{ root: classes.root, label: classes.label }}
                        >Submit</Button>
                       
                    </div>
                </Grid>

                <Grid container mt={4}>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"New user? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
            </Grid>
        </form>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
      
    </Container>
    )
}