import React from 'react';
import { Grid, makeStyles, Typography, Button, CardContent, Card, Avatar } from '@material-ui/core';
import Posts from '../posts';
import UpdateProfile from './UpdateProfile'

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 100,
    width: '60%',
    marginLeft: 300,
    borderRadius: 30,
  },
  avatar: {
    backgroundColor:'#935FF9',
    marginBottom: '20px',
    width: 80,
    height: 80,
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    color: '#FFFFFF',
    marginTop: 20,
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
  },
  typographyStyle: {
    textAlign: 'center',
  },
  secondGrid: {
    marginTop: 10,
    marginLeft: 30,
  }
});

function ProfileInfo () {
  return (
    <div>
      <div>
        <Card className={useStyles().root}>

          <CardContent >
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Avatar alt="Profile image" className={useStyles().avatar} src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg" />
              </Grid>

              <Grid item  >
                <Button aria-label="recipe" className={useStyles().buttonStyle}  >
                  <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfile">
                    Edit Profile
                  </Link>
                </Button>
              </Grid>
            </Grid>

            <Typography gutterBottom variant="h5" component="h2" className={useStyles().typographyStyle}  > 
              Chathura Wanniarachchi
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
              <p>An undergraduate at University of Colombo</p>
              <p>University of Colombo School of Computing</p>
            </Typography>

          </CardContent>
          </Card>
      </div>

      <div>
        <Grid className={useStyles().secondGrid} container spacing={3} justifyContent="center">
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
                  <p>20 posts created</p>
                  <p>10 tags following</p>
                  <p>200 followers</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item  >
            <Posts />
            <Posts />
            <Posts />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfileInfo