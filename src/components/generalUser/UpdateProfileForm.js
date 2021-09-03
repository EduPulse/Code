import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Grid, makeStyles, Button, CardContent, Card, Avatar, TextField } from '@material-ui/core';
import axios from 'axios';

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

function UpdateProfileForm({ userID, userName, userPersonalEmail, userProfilePic, userGender, userBday, userBio, userUniversity, userStatus }) {
  const classes = useStyles();

  const [name, setName] = useState(userName);
  const [personalEmail, setPersonalEmail] = useState(userPersonalEmail);
  const [bio, setBio] = useState(userBio);
  //const [unieversity, setUnieversity] = useState(userUniversit);
  //const [status, setStatus] = useState(userStatus);
  //const [academicEmail, setAcademicEmail] = useState('');
 // const [faculty, setFaculty] = useState('');
  const [gender, setGender] = useState(userGender);
  const [bday, setBbday] = useState(userBday);
  // const [userProfilePic, setUserProfilePic] = useState(userProfilePic)
  useEffect(() => { setName(userName)}, [userName] )
  useEffect(() => { setPersonalEmail(userPersonalEmail)}, [userPersonalEmail] )
  useEffect(() => { setBio(userBio)}, [userBio] )
  useEffect(() => { setGender(userGender)}, [userGender] )
  useEffect(() => { setBbday(userBday)}, [userBday] )

  const updateUserHandler = () => {
    let item = { 
      "userID": userID,
      "name": name, 
      "personalEmail": personalEmail, 
      "bio": bio, 
      // "unieversity": unieversity, 
      // "status": userStatus, 
      // "academicEmail": academicEmail, 
      // "faculty": faculty, 
      "gender": gender,
      "bday": bday,
      // "profilePicture": profilePic,
    }
    console.warn("item", item);

    const urlUpdateUser = "http://localhost:9000/update_profile/userProfileUpdate";
    axios.post(urlUpdateUser, item ).then(function (response) {
      console.log('User profile is updated');
    }).catch(function () {
      console.error("User profile update failed");
    })
  }

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

          {/* <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" multiline rows={3} value={"userName"} />
              </form> */}
          <Form >
            <Form.Group>
              <Form.Label >Name</Form.Label>
              {/* <TextField className={classes.controlStyle} value={userName} onChange={(e)=>{setName(e.target.value)}} /> */}
              <Form.Control className={classes.controlStyle} type="text" required="true" defaultValue={userName} onChange={(e)=>{setName(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              {/* <TextField className={classes.controlStyle} value={userBio} onChange={(e)=>{setBio(e.target.value)}} /> */}
              <Form.Control className={classes.controlStyle} type="text" defaultValue={userBio} onChange={(e)=>{setBio(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label >Personal Email</Form.Label>
              {/* <TextField className={classes.controlStyle} required="true" value={userPersonalEmail} onChange={(e)=>{setPersonalEmail(e.target.value)}} /> */}
              <Form.Control className={classes.controlStyle} type="email" required="true" defaultValue={userPersonalEmail} onChange={(e)=>{setPersonalEmail(e.target.value)}} />
            </Form.Group>

            {/* <Form.Group>
              <Form.Label >Academic Email</Form.Label>
              <Form.Control className={classes.controlStyle} type="email" required="true" onChange={(e)=>{setName(e.target.value)}} onChange={(e)=>{setAcademicEmail(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>University</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" value={userUniversity} onChange={(e)=>{setUnieversity(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Faculty</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" onChange={(e)=>{setFaculty(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control className={classes.controlStyle} type="text" required="true" value={userStatus} onChange={(e)=>{setStatus(e.target.value)}} />
            </Form.Group> */}

            <Form.Group>
              <Form.Label >Gender</Form.Label>
              {/* <TextField className={classes.controlStyle} type="text" onChange={(e)=>{setGender(e.target.value)}}  /> */}
              <Form.Control className={classes.controlStyle} type="text" onChange={(e)=>{setGender(e.target.value)}} />
            </Form.Group>

            <Form.Group>
              <Form.Label >Birthday</Form.Label>
              {/* <TextField className={classes.controlStyle} type="date" onChange={(e)=>{setBbday(e.target.value)}} /> */}
              <Form.Control className={classes.controlStyle} type="date" onChange={(e)=>{setBbday(e.target.value)}} />
            </Form.Group>

            {/* <Link to={urlProfUpdate}> */}
              <Button className={classes.buttonStyleSubmit} onClick={updateUserHandler} >Save updates</Button>
            {/* </Link> */}

            <Button className={classes.buttonStyleCancel}>Exit</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProfileForm