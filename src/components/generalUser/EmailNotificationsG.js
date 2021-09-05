import React from 'react';
import { makeStyles, CardContent, Card, Button, Grid, Avatar, Typography } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

// import ProfileButtonSet from './profileButtonSet';
import UpdateProfileForm from './UpdateProfileFormG';
import Customization from './CustomizationG'
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
  postsInfo: {
    width: '100%',
  },
  FormStyle: {
    marginLeft: '50px',
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
    <div >
      {/* <Grid container spacing={2} className={useStyles().postsInfo}> */}
      
      <Card className={useStyles().FormStyle}>
      <CardContent >
        <Grid container item xs={12} className={useStyles().Form}>
        <Typography gutterBottom variant="h5" component="h2">Email Notifications</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me weekly newsletter emails" />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone replies to me in a comment" />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone mentions me" />
        </FormGroup>
        </Grid>
        </CardContent>
      </Card>
      {/* </Grid> */}
    </div>
  );
}

export default EmailNotifications