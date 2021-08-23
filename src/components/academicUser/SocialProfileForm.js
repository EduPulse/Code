import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { makeStyles, CardContent, Card, Button, } from '@material-ui/core';

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

function SocialProfileForm ({ userID, linkedInAcc, facebookAcc, twitterAcc, githubAcc, personalAcc }) {
// function SocialProfileForm () {

  const [linkein, setLinkein] = useState(linkedInAcc);
  const [facebook, setFacebook] = useState(facebookAcc);
  const [twitter, setTwitter] = useState(twitterAcc);
  const [github, setGithub] = useState(githubAcc);
  const [personal, setPersonal] = useState(personalAcc);

  const updateSocialAccHandler = () => {
    if (linkein !== linkedInAcc) {
      linkedInAcc = linkein;
    }
    if (facebook !== facebookAcc) {
      facebookAcc = facebook;
    }
    if (twitter !== twitterAcc) {
      twitterAcc = twitter;
    }
    if (github !== githubAcc) {
      githubAcc = github;
    }
    if (personal !== personalAcc) {
      personalAcc = personal;
    }

    let socilaAccounts = { 
      "userID": userID,
      "linkedin": linkedInAcc, 
      "facebook": facebookAcc, 
      "twitter": twitterAcc, 
      "github": githubAcc, 
      "personal": personalAcc,
    }
    console.log(socilaAccounts);

    const urlUpdateSocials = "http://localhost:9000/update_profile/socialProfileUpdate";
    axios.post(urlUpdateSocials, socilaAccounts ).then(function (response) {
      console.log('Social Accounts are updated');
    }).catch(function () {
      console.error("Social Accounts update failed");
    })
  }


  return (
    <div align= 'center'>
      <div className={useStyles().root}>
        
          <Card className={useStyles().cardStyle}>
            <CardContent>
              <Form>
                <Form.Group>
                    <Form.Label >Twitter</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={twitterAcc} onChange={(e)=>{setTwitter(e.target.value)}} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                </Form.Group>

                <Form.Group>
                    <Form.Label >Facebook</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={facebookAcc} onChange={(e)=>{setFacebook(e.target.value)}} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                </Form.Group>

                <Form.Group>
                    <Form.Label>LinkedIn</Form.Label>
                    {/* <Form.Control className={useStyles().controlStyle} type="text" /> */}
                    <Form.Control className={useStyles().controlStyle} type="text" value={linkedInAcc} onChange={(e)=>{setLinkein(e.target.value)}} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Github</Form.Label>
                    {/* <Form.Control className={useStyles().controlStyle} type="text"/> */}
                    <Form.Control className={useStyles().controlStyle} type="text" value={githubAcc} onChange={(e)=>{setGithub(e.target.value)}} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Personal Website</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" value={personalAcc} onChange={(e)=>{setPersonal(e.target.value)}} />
                    {/* <Form.Control className={useStyles().controlStyle} type="text" /> */}
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Medium</Form.Label>
                    <Form.Control className={useStyles().controlStyle} type="text" />
                </Form.Group> */}

                <Button className={useStyles().buttonStyleSubmit} onClick={updateSocialAccHandler} >Save updates</Button>
                <Button className={useStyles().buttonStyleCancel}>Exit</Button>
              </Form>
            </CardContent>
          </Card>
        
      </div>
    </div>
  );
}

export default SocialProfileForm