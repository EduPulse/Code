import React, {useEffect, useState} from 'react'
import './../../../index.css';

import {Avatar, Button, Grid, makeStyles} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import UpdateProfileForm from './UpdateProfileForm';
import SocialProfileForm from './SocialProfileForm';
import UpdateProfilePic from './UpdateProfilePic';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
    },
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
    const [pic, setPic] = useState('none');
    const [email, setEmail] = useState('none');
    const [social, setSocial] = useState('none');
    const [tags, setTags] = useState('none');
    const [alltags, setAlltags] = useState([]);
    const [followers, setFollowers] = useState([]);

    const [userData, setUserData] = useState([]);
    const userID = "60ed8d6597a4670ca060ed6b";
    const userInfo = {"_id": userID};
    console.log(userInfo);

    const urlGetUserProfile = "http://localhost:9000/update_profile/user";
    useEffect(() => {
        axios.post(urlGetUserProfile, userInfo).then(function (response) {
            setUserData(response.data);
        }).catch(function () {
            console.error("Profile details loading failed");
        })
    }, []);

    const urlGetUserSocialMedia = "http://localhost:9000/update_profile/social";
    useEffect(() => {
        axios.post(urlGetUserSocialMedia, userInfo).then(function (response) {
            setUserData(response.data);
        }).catch(function () {
            console.error("Social media details load failed");
        })
    }, []);

    const urlGetAllTags = "http://localhost:9000/all_tags";
    useEffect(() => {
        axios.post(urlGetAllTags).then(function (response) {
            setAlltags(response.data);
        }).catch(function () {
            console.error("All Tags details load failed");
        })
    }, []);

    return (
        <div>
            <div align='center'>
                <div className={useStyles().root}>
                    <Grid container className={useStyles().headerInfo} spacing={3}>
                        <Grid item>
                            <Avatar alt="Profile image" className={useStyles().avatar} src={userData.profilePicture}/>
                        </Grid>

                        <Grid item>
                            {userData.name} / Edit Profile
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={useStyles().pubPostInfo}>
                        <Grid item xs className={useStyles().postsInfo}>
                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setProfile("block");
                                setPic("none");
                                setCustomization("none");
                                setTags("none");
                                setFollowers("none");
                                setEmail("none");
                                setSocial("none");
                            }}>
                                My Profile
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setProfile("none");
                                setPic("none");
                                setCustomization("none");
                                setTags("none");
                                setFollowers("none");
                                setEmail("none");
                                setSocial("block");
                            }}>
                                Social Accounts
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setProfile("none");
                                setPic("block");
                                setCustomization("none");
                                setTags("none");
                                setFollowers("none");
                                setEmail("none");
                                setSocial("none");
                            }}>
                                Profile Picture
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setProfile("none");
                                setPic("none");
                                setCustomization("none");
                                setTags("block");
                                setFollowers("none");
                                setEmail("none");
                                setSocial("none");
                            }}>
                                Following Tags
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setProfile("none");
                                setPic("none");
                                setCustomization("none");
                                setTags("none");
                                setFollowers("block");
                                setEmail("none");
                                setSocial("none");
                            }}>
                                My Followers
                            </Button>

                            {/* <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setPic("none"); setCustomization("block"); setTags("none"); setFollowers("none"); setEmail("none"); setSocial("none"); }}>
                Customization
              </Button>

              <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => { setProfile("none"); setPic("none"); setCustomization("none"); setTags("none"); setFollowers("none"); setEmail("block"); setSocial("none"); }}>
                Email Notifications
              </Button> */}
                        </Grid>
                        <Grid item xs={8} className={useStyles().postsInfo}>
                            <Grid style={{display: profile}}>
                                <UpdateProfileForm
                                    userID={userData._id}
                                    userName={userData.name}
                                    userPersonalEmail={userData.personalEmail}
                                    //userAcademicEmail={userData.}
                                    userProfilePic={userData.profilePicture}
                                    userGender={userData.gender}
                                    userBday={userData.birthday}
                                    userBio={userData.bio}
                                    //userUniversity={userData.university}
                                    //userFaculty={userData.faculty}
                                    //userStatus={userData.status}
                                />
                            </Grid>

                            <Grid style={{display: social}}>
                                <SocialProfileForm
                                    userID={userData._id}
                                    linkedInAcc={userData.linkedin}
                                    facebookAcc={userData.facebook}
                                    twitterAcc={userData.twitter}
                                    githubAcc={userData.github}
                                    personalAcc={userData.personal}
                                />
                            </Grid>

                            <Grid style={{display: pic}}>
                                <UpdateProfilePic
                                    userID={userData._id}
                                    userProfilePic={userData.profilePicture}
                                />
                            </Grid>

                            {/* <Grid style={{ display: tags }}>
                <FollowingTags
                  userID={userData._id}
                  curTags = {userData.followingTags}
                  allTags = {alltags}
                />
              </Grid> */}

                            {/* <Grid style={{ display: followers }}>
                <Followers 
                  userID={userData._id}
                  followers = {userData.followedBy}
                />
              </Grid> */}

                            {/* <Grid style={{ display: customization }}>
                <Customization />
              </Grid>

              <Grid style={{ display: email }}>
                <EmailNotifications />
              </Grid> */}
                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
}

export default UpdateProfile
