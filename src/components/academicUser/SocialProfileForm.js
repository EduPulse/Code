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

function SocialProfileForm ({ linkedIn, facebook, twitter, github, personal }) {
// function SocialProfileForm () {
  return (
    <div align= 'center'>
      <div className={useStyles().root}>
        
          <Card className={useStyles().cardStyle}>
            <CardContent>
              <Form>
                <Form.Group>
                    <Form.Label >Twitter</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={twitter} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                </Form.Group>

                <Form.Group>
                    <Form.Label >Facebook</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={facebook} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                </Form.Group>

                <Form.Group>
                    <Form.Label>LinkedIn</Form.Label>
                    {/* <Form.Control className={useStyles().controlStyle} type="text" /> */}
                    <Form.Control className={useStyles().controlStyle} type="text" value={linkedIn} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Github</Form.Label>
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                    <Form.Control className={useStyles().controlStyle} type="text" value={github} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Personal Website</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={personal} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text" /> */}
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Medium</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                </Form.Group> */}

                <Button className={useStyles().buttonStyleSubmit}>Save details</Button>
                <Button className={useStyles().buttonStyleCancel}>Exit</Button>
              </Form>
            </CardContent>
          </Card>
        
      </div>
    </div>
  );
}

export default SocialProfileForm