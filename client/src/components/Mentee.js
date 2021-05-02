import React,{useState,useEffect}from "react";
import MUIDataTable from "mui-datatables";
import {call} from '../api'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Notification from './Notification'
import {Button} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  
    root: theme.mixins.gutters({
      width:'100%',
      margin: 'auto',
      marginTop: theme.spacing(5),
      justifyContent: 'center'
    }),
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

export default function Mentee(){
  
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(true)
    const classes = useStyles()
    const [notify, setNotify] = useState({isOpen:false,message:'',type:''})

    const handleClick = (adata) =>{
    
       
        call('post','pool/accept',{_id:adata[0],subject:adata[1]}).then((tdata) => {
    
        setNotify({
            isOpen: true,
            message: 'Mentee Accepted!',
            type: 'success'
          })  
    
        }).catch((err)=>{
            
            console.log(err);
        })
        
     
    }


    useEffect(() => {
   
        call('get','pool/search').then((indata) => {
            setData([]);
            setLoading(false)
            indata.map(user => {
                let mentee=[];
                mentee.push(user.x._id)
                mentee.push(user.subject._id)
                mentee.push(user.x.name)
                mentee.push(user.x.class)
                mentee.push(user.subject.name)
                setData(prevArray => [...prevArray, mentee])
            });
            
        }).catch((err)=>{
            
            console.log(err);
        })
        
    },[notify.isOpen])

    const columns = [{
        name: "_id",
        options: {
          display: false,
          filter: false
        }
      },{
        name: "subject",
        options: {
          display: false,
          filter: false
        }
      },"Name", "Class", "Subject",{
        label: "Accept",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button variant="outlined" size="small" color="primary" onClick={() => handleClick(tableMeta.rowData)}>
                        Accept
                    </Button>
                )
            },
            filter: false
        }
    }];

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false,
    };
    if(loading) {

        return  <div className={classes.spinner}>
                  <CircularProgress
                    size={40}
                  />
                </div>
    }
    return (
        <Container className={classes.root}>
                 <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />
           
        </Container> 
      
    );
}

