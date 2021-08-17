import React from 'react'
import AdminNav from './AdminNav'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MultiAxisLine from './charts/UserLogChart.js';
import PieChart from './charts/TotalRegChart';
import VerticalBar from './charts/NewRegChart';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import UserAccManage from './UserAccManage.js'; 
import AdvManage from './AdvManage.js'; 

//import { useState,useEffect } from 'react';
//import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        margin: '20px 30px'
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius:'15px'
      },
      title:{
          color: '#4411A8',
      },
      titlecontainer:{
        backgroundColor:'white',
        width:'40vw',
        marginTop: '50px',
        borderRadius:'20px',
        padding:'5px 5px'
      },
      userstat:{
        height:'25%',
        margin: '10px 10px',
        borderRadius:'15px',
        padding: '5px 5px',
      },
      number:{
          marginTop:'0px'
      }
}))
function AdminHome() { 

    /* const [state, setstate] = useState("");

    useEffect(()=>{
    axios.get("http://localhost:9000/mongotest")
      .then(res=>{
          console.log(res.data);
          setstate(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
  }) */
    return (
        <Router>
        <div>
            <AdminNav/>
            <Switch>
                <Route path="/components/admin/AdminHome" exact component={AdminHomePage}/>
                <Route path="/components/admin/UserAccManage" component={UserAccManage}/>
                <Route path="/components/admin/AdvManage" component={AdvManage}/>
            </Switch>
        </div>
        </Router>
    );
}

const AdminHomePage = ()=>(
    <div>
        <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>EduPulse Dashboard</h2>
                </div>
        </center>
            <div className={useStyles().root}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={9}>
                        <Paper className={useStyles().paper} >
                            <MultiAxisLine/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper className={useStyles().paper} style={{height:'50vh'}}>
                            <div className={useStyles().userstat} >
                                <h2 className={useStyles().number}>235</h2>
                                <h3>Total Live Users</h3>
                            </div>
                            <div className={useStyles().userstat} style={{border:'2px solid rgb(255, 99, 132)'}}>
                                <h2 className={useStyles().number}>210</h2>
                                <h4>Academic Users</h4>
                            </div>
                            <div className={useStyles().userstat} style={{border:'2px solid rgb(54, 162, 235)'}}>
                                <h2 className={useStyles().number}>120</h2>
                                <h4>General Users</h4>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={useStyles().paper}>
                            <PieChart/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper className={useStyles().paper}>
                            <VerticalBar/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
    </div>
);
export default AdminHome
