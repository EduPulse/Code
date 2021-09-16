import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Button, Avatar, Card, Divider } from '@material-ui/core';
import UpdateProfileForm from './UpdateProfileForm';
import SocialProfileForm from './SocialProfileForm';
import UpdateProfilePic from './UpdateProfilePic';
import Followers from './Followers';
import Following from './Following';
import FollowingTags from './FollowingTags';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '80%',
    },
    cardStyles: {
        backgroundColor: '#FFFFFF',
        width: '96%',
        marginLeft: '150px',
        marginTop: '100px',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: 10
    },
    gridOneStyle: {
        marginTop: '10px',
        marginBottom: '20px',
        marginLeft: '250px',
        width: '100%'
    },
    gridOneItemTwoStyle: {
        fontSize: '24px',
        marginTop: '10px',
        marginBottom: '20px',
        // fontFamily: 'Courgette',
        color: '#4411A8',
        textAlign: 'center',
    },
    gridTwoStyle: {
        marginTop: 10,
        width: '100%',
        marginBottom: '15px'
    },
    gridTwoItemOneStyle: {
        // width: '300px',
        // backgroundColor: '#F00FF0'
        marginLeft: '20px'
    },
    gridTwoItemTwoStyle: {
        marginLeft: '20px'
    },
    avatar: {
        backgroundColor: '#935FF9',
        width: '100px',
        height: '100px',
        marginLeft: '180px'
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '80%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        '&:focus': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px',
        marginLeft: '30px'
    },
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

    const [university, setuniversity] = useState('');
    const university_id = profileData.academicInstitute;
    const url_getUniversity = "http://localhost:9000/loggedIn_User/get_university";
    useEffect(() => {
        axios.post(url_getUniversity, university_id).then(function (response) {
            setuniversity(response.data);
        }).catch(function () {
        console.error("University loading failed");
        })
    }, []);
    console.log("University: ", university.name)

    return (
        <div className={useStyles().root} >
            <Card className={useStyles().cardStyles} >
                <Grid container className={useStyles().gridOneStyle} spacing={3} >
                    <Grid item >
                        <Avatar alt="Profile image" className={useStyles().avatar} src={profileData.profilePicture} />
                    </Grid>
                    {/* <Grid item className={useStyles().gridOneItemTwoStyle} >
                        Hi, {profileData.name } !
                    </Grid> */}
                </Grid>

                <Grid >
                    <Grid item className={useStyles().gridOneItemTwoStyle} >
                        Hi, {profileData.name } !
                    </Grid>
                </Grid>

                <Divider />

                <Grid container spacing={1} className={useStyles().gridTwoStyle} >
                    <Grid item xs={3} className={useStyles().gridTwoItemOneStyle} >
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

                    <Grid item xs={8} className={useStyles().gridTwoItemTwoStyle} >
                        <Grid style={{ display: profileForm }} >
                            <UpdateProfileForm 
                                userID = {profileData._id}
                                userName = {profileData.name}
                                userBio = {profileData.bio}
                                userUni = {university.name}
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

                        <Grid style={{ display: following }} >
                            <Following
                                // userID = {profileData._id}
                            />
                        </Grid>

                        <Grid style={{ display: followingTags }} >
                            <FollowingTags
                                // userID = {profileData._id}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default UpdateProfile