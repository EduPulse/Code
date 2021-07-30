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
import SearchResult from './components/generalUser/SearchResult';
import ViewArticle from "./components/generalUser/ViewArticle";

import AllNotifications from "./components/generalUser/AllNotifications";
import Customization from "./components/generalUser/Customization";
import EmailNotifications from "./components/generalUser/EmailNotifications";
import Home from "./components/generalUser/Home1";
import UpdateProfile from "./components/generalUser/UpdateProfile";
import UpdateProfileForm from "./components/generalUser/UpdateProfileForm";
import PublisherProfile from "./components/generalUser/PublisherProfile";


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

          <Route path="/components/generalUser/search" component={SearchResult}/>
          {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}
          {/* <Route path="/components/generalUser/Home" component={Home}/> */}
          <Route path="/components/generalUser/viewArticle" component={ViewArticle}/>

          <Route path="/components/generalUser/AllNotifications" component={AllNotifications}/>
          <Route path="/components/generalUser/UpdateProfileForm" component={UpdateProfileForm}/>
          <Route path="/components/generalUser/PublisherProfile" component={PublisherProfile}/>
          <Route path="/components/generalUser/UpdateProfile" component={UpdateProfile}/>
          <Route path="/components/generalUser/Customization" component={Customization}/>
          <Route path="/components/generalUser/EmailNotifications" component={EmailNotifications}/>
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
            <Link to="/components/GenUser/GenUserHome">Click here</Link>
            <Link to="/components/admin/AdminHome">Click here</Link>
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
