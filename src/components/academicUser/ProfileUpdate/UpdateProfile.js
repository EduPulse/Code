import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Button, Avatar, Card, } from '@material-ui/core';
import UpdateProfileForm from './UpdateProfileForm';
import SocialProfileForm from './SocialProfileForm';
import UpdateProfilePic from './UpdateProfilePic';
import Followers from './Followers';
import Following from './Following';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '80%',
    },
    cardStyles: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        marginLeft: '220px',
        marginTop: '100px',
        borderRadius: '30px',
        marginBottom: '20px'
    },
    gridOneStyle: {
        marginTop: '10px',
        marginBottom: '20px',
        marginLeft: '250px',
        width: '100%'
    },
    gridOneItemTwoStyle: {
        fontSize: '24px',
        marginTop: '40px',
        fontFamily: 'Courgette',
        color: '#4411A8',
        textAlign: 'center',
    },
    gridTwoStyle: {
        width: '100%',
    },
    gridTwoItemTwoStyle: {
        marginRight: '20px'
    },
    avatar: {
        backgroundColor: '#935FF9',
        width: '100px',
        height: '100px',
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '70%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px',
        marginLeft: '70px'
    },
    // buttonSetStyle: {
    //     width: '100%',
    // }
}));

function UpdateProfile() {

    const [profileForm, setprofileForm] = useState('block');
    const [socialAccounts, setsocialAccounts] = useState('none');
    const [profilePicture, setprofilePicture] = useState('none');
    const [followingTags, setfollowingTags] = useState('none');
    const [followers, setfollowers] = useState('none');
    const [following, setfollowing] = useState('none');

    const [profileData, setProfileData] = useState([])
    const logggedInUserId = '60ecfe51395a1704a42d8cae';
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = "http://localhost:9000/loggedIn_User/";
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
        console.error("Profile loading failed");
        })
    }, []);

    return (
        <div className={useStyles().root} >
            <Card className={useStyles().cardStyles} >
                <Grid container className={useStyles().gridOneStyle} spacing={3} >
                    <Grid item >
                        <Avatar alt="Profile image" className={useStyles().avatar} src={profileData.profilePicture} />
                    </Grid>
                    <Grid item className={useStyles().gridOneItemTwoStyle} >
                        Hi, {profileData.name } !
                        {/* { userData.name } / Edit Profile */}
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={useStyles().gridTwoStyle} >
                    <Grid item xs >
                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('block');
                                setsocialAccounts('none');
                                setprofilePicture('none');
                                setfollowingTags('none');
                                setfollowers('none');
                                setfollowing('none');
                            }}
                        >
                            My Profile
                        </Button>

                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('none');
                                setsocialAccounts('block');
                                setprofilePicture('none');
                                setfollowingTags('none');
                                setfollowers('none');
                                setfollowing('none');
                            }}
                        >
                            Social Accounts
                        </Button>

                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('none');
                                setsocialAccounts('none');
                                setprofilePicture('block');
                                setfollowingTags('none');
                                setfollowers('none');
                                setfollowing('none');
                            }}
                        >
                            Profile Picture
                        </Button>

                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('none');
                                setsocialAccounts('none');
                                setprofilePicture('none');
                                setfollowingTags('block');
                                setfollowers('none');
                                setfollowing('none');
                            }}
                        >
                            Following Tags
                        </Button>

                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('none');
                                setsocialAccounts('none');
                                setprofilePicture('none');
                                setfollowingTags('none');
                                setfollowers('block');
                                setfollowing('none');
                            }}
                        >
                            My Followers
                        </Button>

                        <Button className={useStyles().buttonStyle} 
                            onClick={ () => {
                                setprofileForm('none');
                                setsocialAccounts('none');
                                setprofilePicture('none');
                                setfollowingTags('none');
                                setfollowers('none');
                                setfollowing('block');
                            }}
                        >
                            Following
                        </Button>
                    </Grid>

                    <Grid item xs className={useStyles().gridTwoItemTwoStyle} >
                        <Grid style={{ display: profileForm }} >
                            <UpdateProfileForm 
                                userID = {profileData._id}
                                userName = {profileData.name}
                                userBio = {profileData.bio}
                                // userUni = {profileData.academicInstitute.name}
                                userFaculty = {profileData.faculty}
                                userPersonalMail = {profileData.personalEmail}
                                userAcaMail = {profileData.academicEmail}
                                userGender = {profileData.gender}
                                userBday = {profileData.birthday}
                            />
                        </Grid>

                        <Grid style={{ display: socialAccounts }} >
                            <SocialProfileForm
                                userID = {profileData._id}
                                // linkedin = {profileData.linkedin}
                                // facebook = {profileData.facebook}
                                // twitter = {profileData.twitter}
                                // github = {profileData.github}
                                // personal = {profileData.personal}
                            />
                        </Grid>

                        <Grid style={{ display: profilePicture }} >
                            <UpdateProfilePic
                                userID = {profileData._id}
                            />
                        </Grid>

                        <Grid style={{ display: followers }} >
                            <Followers
                                userID = {profileData._id}
                            />
                        </Grid>

                        {/* <Grid style={{ display: following }} >
                            <Following
                                userID = {profileData._id}
                            />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default UpdateProfile

