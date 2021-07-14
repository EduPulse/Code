import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { Grid, makeStyles, Button, CardContent, Card, Avatar } from '@material-ui/core';
import AcaNavbar from './acaNavbar'
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
    backgroundColor:'#935FF9',
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
      backgroundColor: '#4411A8',
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
  controlStyle: {
    backgroundColor: '#C5B6E3',
  }
}));

function UpdateProfileForm() {
  const classes = useStyles();

  return (
    <div>
      <AcaNavbar/>

      <div align= 'center'>
        <div className={classes.root}>
          <Grid container className={classes.headerInfo} spacing={3} >
              <Grid item >
                  <Avatar aria-label="recipe" className={ classes.avatar }>N</Avatar>
              </Grid>
              
              <Grid item  >
                  <Button aria-label="recipe" className={ classes.buttonStyle }>Naveen Perera / Edit Profile</Button>
              </Grid>
          </Grid>

          <Grid container spacing={3} className={ classes.pubPostInfo }>
              <Grid item xs className={ classes.postsInfo }>
                  <ProfileButtonSet/>
              </Grid>
              <Grid item xs={8} className={classes.postsInfo}>
                <Card className={classes.cardStyle}>
                  <CardContent>
                    <Grid container spacing={3} >
                      <Grid item >
                          <Avatar aria-label="recipe" className={classes.avatar}>N</Avatar>
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
                          <Form.Control className={classes.controlStyle} type="text" />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label >Email</Form.Label>
                        <Form.Control  className={classes.controlStyle}  type="email" />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control className={classes.controlStyle}  type="text" />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>University</Form.Label>
                        <Form.Control className={classes.controlStyle}  type="text" />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Faculty</Form.Label>
                        <Form.Control className={classes.controlStyle}  type="text" />
                      </Form.Group>

                      <Button className={classes.buttonStyleSubmit}>Save updates</Button>
                      <Button className={classes.buttonStyleCancel}>Exit</Button>
                    </Form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>

      </div>
  );
}

export default UpdateProfileForm