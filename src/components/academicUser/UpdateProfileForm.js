import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Grid, makeStyles, Button, CardContent, Card, Avatar, Input } from '@material-ui/core';
import AcaNavbar from './acaNavbar';
import ProfileButtonSet from './ProfileButtonSet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block',
  },
  cardStyle: {
    marginBottom: '30px',
    borderRadius: '10px',
  },
  avatar: {
    backgroundColor: '#935FF9',
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
      backgroundColor: '#FA2C2C',
    },
    marginBottom: '20px'
  },
  buttonStyleSubmit: {
    backgroundColor: '#4411A8',
    color: '#FFFFFF',
    paddingLeft: '20px',
    textAlign: 'center',
    width: '150px',
    '&:hover': {
      backgroundColor: '#935FF9',
    },
    marginBottom: '20px',
    marginTop: '30px'
  },
  buttonStyleCancel: {
    backgroundColor: '#FA2C2C',
    color: '#FFFFFF',
    marginLeft: '20px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#A50000',
    },
    marginBottom: '20px',
    marginTop: '30px'
  },
  controlStyle: {
    backgroundColor: '#C5B6E3',
  }
}));

function UpdateProfileForm({ userID, userName, userPersonalEmail, userProfilePic, userBio, userUniversity, userStatus }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.cardStyle}>
        <CardContent>
          <Grid container spacing={3} >
            <Grid item >
            {/* <Avatar alt="Profile image" className={useStyles().avatar} src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg" /> */}
            <Avatar alt="Profile image" className={useStyles().avatar} src={userProfilePic} />
            </Grid>
            <Grid item xs={5} >
              <Button aria-label="recipe" className={classes.buttonStyleMain}>Upload New Photo</Button>
            </Grid>
            <Grid item xs={4} >
              <Button aria-label="recipe" className={classes.buttonStyleSub}>Remove Photo</Button>
            </Grid>
          </Grid>

          <Form>
            <Form.Group>
              <Form.Label >Name</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" value={userName} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" value={userBio} />
            </Form.Group>

            <Form.Group>
              <Form.Label >Personal Email</Form.Label>
              <Form.Control className={classes.controlStyle} type="email" required="true" value={userPersonalEmail} />
            </Form.Group>

            <Form.Group>
              <Form.Label >Academic Email</Form.Label>
              <Form.Control className={classes.controlStyle} type="email" required="true" />
            </Form.Group>

            <Form.Group>
              <Form.Label>University</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" value={userUniversity} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Faculty</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" value={userStatus} />
            </Form.Group>

            <Form.Group>
              <Form.Label >Gender</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label >Birthday</Form.Label>
              <Form.Control className={classes.controlStyle} type="date" />
            </Form.Group>

            <Button className={classes.buttonStyleSubmit}>Save updates</Button>
            <Button className={classes.buttonStyleCancel}>Exit</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProfileForm