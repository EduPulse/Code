import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Avatar, Button, makeStyles, Typography, CardContent, Card, } from '@material-ui/core';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import AcaNavbar from './acaNavbar'
import ProfileButtonSet from './ProfileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';
import SocialProfileForm from './SocialProfileForm'
import EmailNotifications from './EmailNotifications'

const useStyles = makeStyles((theme) => ({
    root: {
        Width: 1800,
    },
    avatar: {
        backgroundColor:'#935FF9',
        marginLeft: '50px'
    },
    nightCard: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
    },
    dayCard: {
        backgroundColor: '#FFFFFF',
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
          color: '#FFFFFF',
          textDecoration: 'none',
        }
    },
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#DFDAE8',
    },
    pubPostInfo: {
      width: '80%',
    },
    postsInfo:{
      width:'100%',
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
}));

function Customization() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={CustomizedTheme}/>
                <Route path="/components/academicUser/UpdateProfileForm" component={UpdateProfileForm}/>
                <Route path="/components/academicUser/SocialProfileForm" component={SocialProfileForm}/>
                <Route path="/components/academicUser/Customization" component={Customization}/>
                <Route path="/components/academicUser/EmailNotifications" component={EmailNotifications}/>
            </Switch>
        </Router>
    );
}

const CustomizedTheme = () => (
    <div>
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
              <Grid item xs className={ useStyles().postsInfo }>
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
              <Grid item xs={8} className={useStyles().postsInfo}>
                <Card className={useStyles().cardStyle}>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">Site Theme</Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={5} >
                                <Card className={useStyles().nightCard}>
                                    <Typography gutterBottom variant="h5" component="h3">Night Theme</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={5} >
                                <Card className={useStyles().dayCard}>
                                    <Typography  gutterBottom variant="h5" component="h3">Day Theme</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
</div>
</div>
);

export default Customization