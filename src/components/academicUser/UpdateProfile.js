import React, { useState } from 'react'

import { Grid, makeStyles, Button, Avatar, Card, CardContent } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';

import UpdateProfileForm from './UpdateProfileForm';
import Customization from './Customization'
import EmailNotifications from './EmailNotifications'
import SocialProfileForm from './SocialProfileForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
  },
  // cardStyle: {
  //     marginTop: '300px'
  // },
  pubPostInfo: {
    width: '80%',
  },
  postsInfo: {
    width: '100%',
  },
  avatar: {
    backgroundColor: '#935FF9',
  },
  headerInfo: {
    marginTop: '90px',
    marginBottom: '10px',
    marginLeft: '110px',
    width: '100%'
  },
  controlStyle: {
    backgroundColor: '#C5B6E3',
  },
  buttonStyleCancel: {
    backgroundColor: '#FA2C2C',
    color: '#FFFFFF',
    marginLeft: '20px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#A50000',
    },
    marginBottom: '20px'
  },
  buttonStyleMain: {
    backgroundColor: '#4411A8',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#935FF9',
    },
    marginBottom: '20px'
  },
  buttonStyleSub: {
    backgroundColor: '#b3b3cc',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#935FF9',
    },
    marginBottom: '20px'
  },
  buttonStyleSubmit: {
    backgroundColor: '#4411A8',
    color: '#FFFFFF',
    paddingLeft: '20px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#935FF9',
    },
    marginBottom: '20px'
  },
  buttonStyleCancel: {
    backgroundColor: '#FA2C2C',
    color: '#FFFFFF',
    marginLeft: '20px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#A50000',
    },
    marginBottom: '20px'
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
}));

function UpdateProfile() {
  const [profile, setProfile] = useState('block');
  const [customization, setCustomization] = useState('none');
  const [email, setEmail] = useState('none');
  const [social, setSocial] = useState('none');

  return (
    <div>
      <div align='center'>
        <div className={useStyles().root}>
          <Grid container className={useStyles().headerInfo} spacing={3} >
            <Grid item >
            <Avatar alt="Profile image" className={useStyles().avatar} src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg" />
            </Grid>

            <Grid item  >
            Chathura Wanniarachchi / Edit Profile
            </Grid>
          </Grid>

          <Grid container spacing={2} className={useStyles().pubPostInfo}>
            <Grid item xs className={useStyles().postsInfo}>
              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("block"); setCustomization("none"); setEmail("none"); setSocial("none"); }}>
                Update Profile
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setCustomization("none"); setEmail("none"); setSocial("block"); }}>
                Social Profile
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setCustomization("block"); setEmail("none"); setSocial("none"); }}>
                Customization
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setCustomization("none"); setEmail("block"); setSocial("none"); }}>
                Email Notifications
              </Button>
            </Grid>
            <Grid item xs={8} className={useStyles().postsInfo}>
              <Grid style={{ display: profile }}>
                <UpdateProfileForm />
              </Grid>
              <Grid style={{ display: social }}>
                <SocialProfileForm />
              </Grid>
              <Grid style={{ display: customization }}>
                <Customization />
              </Grid>
              <Grid style={{ display: email }}>
                <EmailNotifications />
              </Grid>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
}

export default UpdateProfile
