import React from 'react';
import { Grid, makeStyles, Typography, Button, CardContent, Card, Avatar } from '@material-ui/core';
import UpdateProfile from './UpdateProfile'

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor:'#935FF9',
    marginLeft: '450px'
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    color: '#FFFFFF',
    marginLeft: '300px',
    '&:hover': {
      backgroundColor: '#4411A8',
    },
    marginBottom: '20px'
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

function ProfileInfo () {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={ProfileInfoCard}/>
          <Route path="/components/academicUser/UpdateProfile" component={UpdateProfile}/>
        </Switch>
      </div>
    </Router>
  );
}

const ProfileInfoCard = () => (
  <div>
    <Card className={useStyles().root}>

      <CardContent>

        <Grid container spacing={3} >
          <Grid item >
            <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
          </Grid>

          <Grid item  >
            <Button aria-label="recipe" className={useStyles().buttonStyle}  >
              <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfile">
                Edit Profile
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Typography gutterBottom variant="h5" component="h2"> 
          Naveen Perera
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>An undergraduate of UOC</p>
          <p>Faculty of Science</p>
        </Typography>

      </CardContent>
    </Card>
  </div>
);

export default ProfileInfo