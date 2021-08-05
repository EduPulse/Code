import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

import { makeStyles, CardContent, Card, Button, Grid, Avatar } from '@material-ui/core';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import AcaNavbar from './acaNavbar'
import ProfileButtonSet from './ProfileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';
import Customization from './Customization'
import EmailNotifications from './EmailNotifications'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block', 
  },
  // cardStyle: {
  //     marginBottom: '30px',
  //     borderRadius: '10px',
  // },
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
  controlStyle: {
    backgroundColor: '#C5B6E3',
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

function SocialProfileForm () {
  return (
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
              <CardContent>
                <Form>
                  <Form.Group>
                      <Form.Label >Twitter</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                      <Form.Label >Facebook</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                      <Form.Label>LinkedIn</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                      <Form.Label>Github</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                      <Form.Label>Personal Website</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>

                  <Form.Group>
                      <Form.Label>Medium</Form.Label>
                      <Form.Control className={useStyles().controlStyle} type="text" />
                  </Form.Group>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SocialProfileForm