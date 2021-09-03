import React, { useState } from 'react'

import { Grid, makeStyles, Button, Avatar, Card, CardContent } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import GenNavbar from './genNavbar'
import ProfileButtonSet from './profileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';
import Customization from './Customization 1'
import EmailNotifications from './EmailNotifications 1'

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

  return (
    // <Router>
    <div>
      <div align='center'>
        <div className={useStyles().root}>
          <Grid container className={useStyles().headerInfo} spacing={3} >
            <Grid item >
              <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
            </Grid>

            <Grid item  >
              Naveen Perera / Edit Profile
            </Grid>
          </Grid>

          <Grid container spacing={2} className={useStyles().pubPostInfo}>
            <Grid item xs className={useStyles().postsInfo}>
              {/* <ProfileButtonSet/> */}
              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("block"); setCustomization("none"); setEmail("none"); }}>
                Update Profile
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setCustomization("block"); setEmail("none"); }}>
                Customization
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setCustomization("none"); setEmail("block"); }}>
                Email Notifications
              </Button>
            </Grid>
            <Grid item xs={8} className={useStyles().postsInfo}>
              <Grid style={{ display: profile }}>
                <UpdateProfileForm />
              </Grid>
              <Grid style={{ display: customization }}>
                <Customization />
              </Grid>
              <Grid style={{ display: email }}>
                <EmailNotifications />
              </Grid>
            </Grid>

            {/* <Grid item xs={8} className={useStyles().postsInfo}>
                <Switch>
                  <Route path="/components/generalUser/Update/Profile" component={UpdateProfileForm} />
                  <Route path="/components/generalUser/Update/Customization" component={Customization} />
                  <Route path="/components/generalUser/Update/EmailNotifications" component={EmailNotifications} />
                </Switch>
              </Grid> */}
          </Grid>

        </div>
      </div>
    </div>
    // </Router>
  );
}

const UpdateProfilePage = () => (
  <div>
    <div align='center'>
      <div className={useStyles().root}>
        <Grid container className={useStyles().headerInfo} spacing={3} >
          <Grid item >
            <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
          </Grid>

          <Grid item  >
            Naveen Perera / Edit Profile
          </Grid>
        </Grid>

        <Grid container spacing={2} className={useStyles().pubPostInfo}>
          <Grid item xs className={useStyles().postsInfo}>
            {/* <ProfileButtonSet/> */}
            <Button aria-label="recipe" className={useStyles().buttonStyle}>
              <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfileForm">
                Update Profile
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
              <CardContent>
                <Grid container spacing={3} >
                  <Grid item >
                    <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
                  </Grid>
                  <Grid item xs={5} >
                    <Button aria-label="recipe" className={useStyles().buttonStyleMain}>Upload New Photo</Button>
                  </Grid>
                  <Grid item xs={4} >
                    <Button aria-label="recipe" className={useStyles().buttonStyleSub}>Remove Photo</Button>
                  </Grid>
                </Grid>

                <Form>
                  <Form.Group>
                    <Form.Label >Name</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label >Email</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="email" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>University</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Faculty</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Button className={useStyles().buttonStyleSubmit}>Save updates</Button>
                  <Button className={useStyles().buttonStyleCancel}>Exit</Button>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </div>
    </div>
  </div>
)

export default UpdateProfile
