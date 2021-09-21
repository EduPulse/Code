import React from 'react'
import AdminNav from './AdminNav'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MultiAxisLine from './charts/UserLogChart.js';
import PieChart from './charts/TotalRegChart';
import VerticalBar from './charts/NewRegChart';
import {BrowserRouter as Router, Route, Switch, useRouteMatch ,useLocation} from 'react-router-dom';
//import { Link } from 'react-router-dom';
import UserAccManage from './UserAccManage.js';
import AdvManage from './AdvManage.js';
import Moderators from './Moderators.js';

//import { useState,useEffect } from 'react';
//import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '20px 30px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '15px'
    },
    title: {
        color: '#4411A8',
    },
    titlecontainer: {
        backgroundColor: 'white',
        width: '40vw',
        marginTop: '50px',
        borderRadius: '20px',
        padding: '5px 5px'
    },
    userstat: {
        height: '25%',
        margin: '10px 10px',
        borderRadius: '15px',
        padding: '5px 5px',
    },
    number: {
        marginTop: '0px'
    }
}))

function AdminHome() {
    let match = useRouteMatch();
    console.log(match)

    let location = useLocation()
    console.log(location)
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
                    <Route path="/components/admin/Moderators" component={Moderators}/>
                </Switch>
                {/* <Switch>
                    <Route path={`${match.path}/`} exact component={AdminHomePage}/>
                    <Route path={`${match.path}/UserAccManage`} component={UserAccManage}/>
                    <Route path={`${match.path}/AdvManage`} component={AdvManage}/>
                    <Route path={`${match.path}/Moderators`} component={Moderators}/>
                </Switch> */}
            </div>
        </Router>
    );
}

const AdminHomePage = () => (
    <div>
        <center>
            <div className={useStyles().titlecontainer}>
                <h2 className={useStyles().title}>EduPulse Dashboard</h2>
            </div>
        </center>
        <div className={useStyles().root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Paper className={useStyles().paper}>
                        <MultiAxisLine/>
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
