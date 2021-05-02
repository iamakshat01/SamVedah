import React, { useState } from 'react'
import { Grid, } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {Button, makeStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {call,setToken} from '../api'
import Notification from './Notification'

function RadioGroup(props) {

    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}

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


const roleItems = [
    { id: 'mentor', title: 'Mentor' },
    { id: 'mentee', title: 'Mentee' },
]

const initialFValues = {
    
    name: '',
    email: '',
    phone: '',
    type: 'mentee',
    class: '',
    password:'',

}

export default function Register(props) {
    
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
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('class' in fieldValues && fieldValues.type=="mentee")
        //     temp.class = fieldValues.class < 12 ? "" : "Please Enter a Valid Class"
        // if ('class' in fieldValues && fieldValues.type=="mentee")
        //     temp.class = fieldValues.class > 0 ? "" : "Please Enter a Valid Class"
       
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            
            call('post','auth/register',values).then((data) => {

              setValues(initialFValues)
              setToken(data.token);
              setNotify({
                isOpen: true,
                message: 'Registered Successfully',
                type: 'success'
              })
              props.history.push('/');

              }).catch((err)=>{
                  
                setNotify({
                  isOpen: true,
                  message: 'Registeration Failed',
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
          Sign Up
        </Typography>
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>

                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && {error:true,helperText:errors.name})}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label="Mobile"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && {error:true,helperText:errors.phone})}
                    />
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
                    <RadioGroup
                        margin="normal"
                        name="type"
                        label="Role"
                        value={values.type}
                        onChange={handleInputChange}
                        items={roleItems}
                    />
                   <Grid item xs={12}>
                    { values.type==="mentee" && (<TextField
                        margin="normal"
                        variant="outlined"
                        label="Class"
                        name="class"
                        type="number"
                        value={values.class}
                        onChange={handleInputChange}
                        {...(errors.class && {error:true,helperText:errors.class})}
                    />)}
                    </Grid>
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
                    <Link href="/signin" variant="body2">
                      {"Already Registered? Sign In"}
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