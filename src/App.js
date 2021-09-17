import './App.css';
import Navigationbar from './components/navbar';
import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import Tags from './components/tags';
import Joincard from './components/Joincard';
import Posts from './components/posts';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AcademicUserRoute from './components/academicUser/AcademicUserRoute';
import {Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={AcademicUserRoute}/>
                    <Route path="/components/admin/AdminHome" component={AdminHome}/>
                    <Route path="/moderator/dashboard" component={ModeratorDashboard}/>
                    <Route path="/components/academicUser" component={AcademicUserRoute}/>
                </Switch>
            </div>
        </Router>
    );
}

const Home = () => (

    <div>

        <Navigationbar/>

        <div align="center">
            <Grid container spacing={3} className={useStyles().maingrid}>

                <Grid item xs>
                    <h3>Trending Tags</h3>
                    <Tags/>
                </Grid>

                 <Grid item xs={6}>
                     <Link to="/components/academicUser/Home">Click here</Link>
                    {/* <Link to="/components/admin/AdminHome">Click here</Link> */}
                     <Posts/>
                 </Grid>

                 <Grid item xs>
                     <Joincard/>
                 </Grid>

             </Grid>
        </div>
     </div>
);

export default App;
