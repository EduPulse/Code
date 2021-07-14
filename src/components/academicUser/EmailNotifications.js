import React from 'react';
import { makeStyles, CardContent, Card, Button, Grid, Avatar } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import AcaNavbar from './acaNavbar'
import ProfileButtonSet from './ProfileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';
import Customization from './Customization'
import SocialProfileForm from './SocialProfileForm'
import App from '../../App';

const useStyles = makeStyles({
  root: {
      backgroundColor: '#FFFFFF',
  },
  cardStyle: {
    marginBottom: '30px',
    borderRadius: '10px',
  },
  pubPostInfo: {
    width: '80%',
  },
  postsInfo:{
    width:'100%',
  },
  FormStyle: {
    marginLeft: '100px',
  },
  avatar: {
      backgroundColor:'#935FF9',
  },
  headerInfo: {
      marginTop:'90px',
      marginBottom: '10px',
      marginLeft: '110px',
      width: '100%'
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

function EmailNotifications() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={EmailOptions}/>
            <Route path="/components/academicUser/UpdateProfileForm" component={UpdateProfileForm}/>
            <Route path="/components/academicUser/SocialProfileForm" component={SocialProfileForm}/>
            <Route path="/components/academicUser/Customization" component={Customization}/>
            <Route path="/components/academicUser/EmailNotifications" component={EmailNotifications}/>
        </Switch>
    </Router>
  );
}

const EmailOptions = () => (
  <div >
    <AcaNavbar/>

    <div align= 'center'>
      <div className={useStyles().root}>
        <Grid container className={useStyles().headerInfo} spacing={3} >
            <Grid item >
                <Avatar aria-label="recipe" className={ useStyles().avatar }>N</Avatar>
            </Grid>
            
            <Grid item  >
            Naveen Perera / Edit Profile
            </Grid>
        </Grid>

        <Grid container spacing={2} className={ useStyles().pubPostInfo }>
        <Grid item xs={3}  className={ useStyles().postsInfo }>
            {/* <ProfileButtonSet/> */}
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
        </Grid>
        <Grid item xsclassName={useStyles().Form}></Grid>
          <Card className={useStyles().FormStyle}>
              <FormGroup>
                  <FormControlLabel  control={<Checkbox name="checkedC" />} label="Send me weekly newsletter emails" />        
                  <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone replies to me in a comment" />
                  <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone new follows me" />
                  <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone mentions me" />
              </FormGroup>
          </Card>
        </Grid>
      </div>
    </div>
  </div>
);

export default EmailNotifications