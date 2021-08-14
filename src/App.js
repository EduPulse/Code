import './App.css';
import Navigationbar from './components/navbar';
import React from 'react';
import { Grid,makeStyles } from '@material-ui/core';
import Tags from './components/tags';
import Joincard from './components/Joincard';
import Posts from './components/posts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link } from 'react-router-dom';

// import AdminHome from './components/admin/AdminHome';
import SearchResult from './components/academicUser/SearchResult';
import ViewArticle from "./components/academicUser/ViewArticle";

import AllNotifications from "./components/academicUser/AllNotifications";
import Customization from "./components/academicUser/Customization";
import EmailNotifications from "./components/academicUser/EmailNotifications";
import Home from "./components/academicUser/Home1";
import UpdateProfile from "./components/academicUser/UpdateProfile";
import UpdateProfileForm from "./components/academicUser/UpdateProfileForm";
import PublisherProfile from "./components/academicUser/PublisherProfile";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,    
  },
  maingrid:{
    marginTop:'80px',
    width:'80%'
  }
}));


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home1}/>
          {/* <Route path="/components/admin/AdminHome" component={AdminHome}/> */}

          <Route path="/components/academicUser/search" component={SearchResult}/>
          {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}
          {/* <Route path="/components/generalUser/Home" component={Home}/> */}
          <Route path="/components/academicUser/viewArticle" component={ViewArticle}/>

          <Route path="/components/academicUser/AllNotifications" component={AllNotifications}/>
          <Route path="/components/academicUser/UpdateProfileForm" component={UpdateProfileForm}/>
          <Route path="/components/academicUser/PublisherProfile" component={PublisherProfile}/>
          <Route path="/components/academicUser/UpdateProfile" component={UpdateProfile}/>
          <Route path="/components/academicUser/Customization" component={Customization}/>
          <Route path="/components/academicUser/EmailNotifications" component={EmailNotifications}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home1 = ()=>(
  
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