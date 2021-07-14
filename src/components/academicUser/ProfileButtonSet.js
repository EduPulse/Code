import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UpdateProfileForm from './UpdateProfileForm'
import SocialProfileForm from './SocialProfileForm'
import Customization from './Customization'
import EmailNotifications from './EmailNotifications'

const useStyles = makeStyles({
  root: {
    Width: 1800,
    borderRadius: '10px',
    padding: '10px 10px 10px 0px'
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    width: '80%',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#4411A8',
    },
    marginBottom: '10px'
  },
  linkStyles: {
      color: '#FFFFFF',
      textDecoration: 'none',
      '&:hover': {
        color: '#FFFFFF',
        textDecoration: 'none',
      }
  }
});

function ProfileButtonSet () {
  return (
    <Router>
      <div className="App">
          <Switch>
              <Route path="/" exact component={ButtonGroup}/>
              <Route path="/components/academicUser/UpdateProfileForm" component={UpdateProfileForm}/>
              <Route path="/components/academicUser/SocialProfileForm" component={SocialProfileForm}/>
              <Route path="/components/academicUser/Customization" component={Customization}/>
              <Route path="/components/academicUser/EmailNotifications" component={EmailNotifications}/>
          </Switch>
      </div>
    </Router>
  );
}

const ButtonGroup = () => (
  <div className={useStyles().root}>
        <Button aria-label="recipe" className={useStyles().buttonStyle}>
          <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfileForm">
            Update Profile
          </Link>
        </Button>
        
        <Button aria-label="recipe" className={useStyles().buttonStyle}>
          <Link className={useStyles().linkStyles} to="/components/academicUser/SocialProfileForm">
            Social Profiles
          </Link>
        </Button>
        
        <Button aria-label="recipe" className={useStyles().buttonStyle}>
          <Link className={useStyles().linkStyles} to="/components/academicUser/Customization">
            Customization
          </Link>
        </Button>
        
        <Button aria-label="recipe" className={useStyles().buttonStyle}>
          <Link className={useStyles().linkStyles} to="/components/academicUser/EmailNotifications">
            Email Notifications
          </Link>
        </Button>
    </div>
);

export default ProfileButtonSet