import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import Posts from '../posts';
import axios from 'axios';

import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '60%',
        marginLeft: 300,
        borderRadius: 30,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginBottom: '20px',
        width: 80,
        height: 80,
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        marginTop: 20,
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '20px'
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    },
    typographyStyle: {
        textAlign: 'center',
    },
    secondGrid: {
        marginTop: 10,
        marginLeft: 30,
    }
});

function ProfileInfo() {

    const [profileData, setProfileData] = useState([])
    const logggedInUserId = '60ecfe51395a1704a42d8cae';
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = "http://localhost:9000/loggedIn_User";
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
        console.error("Profile loading failed");
        })
    }, []);

    const [postList, setpostList] = useState([])
    const url_getUserPosts = "http://localhost:9000/loggedIn_User/get_all_publication";
    useEffect(() => {
        axios.post(url_getUserPosts, {user_id: logggedInUserId}).then(function (response) {
            if (response.data)
                setpostList(response.data);
        }).catch(function () {
        console.error("Posts loading failed");
        })
    }, []);
    let postCount = 0;
    postList.map(post => postCount = postCount + 1 );

    const [tagstList, settagsList] = useState([])
    const url_getUserTags = "http://localhost:9000/loggedIn_User/get_all_tags";
    useEffect(() => {
        axios.post(url_getUserTags, {user_id: logggedInUserId}).then(function (response) {
            if (response.data)
                settagsList(response.data);
        }).catch(function () {
        console.error("Tags loading failed");
        })
    }, []);
    let tagsCount = 0;
    tagstList.map(tag => tagsCount = tagsCount + 1 );

    const [followingUsers, setfollowingUsers] = useState([])
    const url_getFollowingUsers = "http://localhost:9000/loggedIn_User/get_followingUsers";
    useEffect(() => {
        axios.post(url_getFollowingUsers, {user_id: logggedInUserId}).then(function (response) {
            if (response.data)
            setfollowingUsers(response.data);
        }).catch(function () {
        console.error("Following Users loading failed");
        })
    }, []);
    let followingUserCount = 0;
    followingUsers.map(followingUser => followingUserCount = followingUserCount + 1 );

    const [followedBy, setfollowedBy] = useState([])
    const url_getFollowedBy = "http://localhost:9000/loggedIn_User/get_followedBy";
    useEffect(() => {
        axios.post(url_getFollowedBy, {user_id: logggedInUserId}).then(function (response) {
            if (response.data)
                setfollowedBy(response.data);
        }).catch(function () {
        console.error("Followed By loading failed");
        })
    }, []);
    let followedByCount = 0;
    followedBy.map(follower => followedByCount = followedByCount + 1 );
    
    return (
        <div>
            <div>
                <Card className={useStyles().root}>

                    <CardContent >
                        <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            <Avatar alt="Profile image" className={useStyles().avatar} src={profileData.profilePicture} />
                        </Grid>

                        <Grid item  >
                            <Button aria-label="recipe" className={useStyles().buttonStyle}  >
                            <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfile">
                                Edit Profile
                            </Link>
                            </Button>
                        </Grid>
                        </Grid>

                        <Typography gutterBottom variant="h5" component="h2" className={useStyles().title}  >
                            {profileData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
                            <p>{profileData.bio}</p>
                            {/* <p>{university}</p> */}
                            <p>{profileData.faculty}</p>
                        </Typography>

                    </CardContent>
                </Card>
            </div>

            <div>
                <Grid className={useStyles().secondGrid} container spacing={3} justifyContent="center">
                    <Grid item>
                        <Card>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
                                <p> Posts created: {postCount} </p>
                                <Divider />
                                <p> Tags following: { tagsCount } </p>
                                <Divider />
                                <p> Following authors: { followingUserCount } </p>
                                <Divider />
                                <p> Followed by: { followedByCount } </p>
                                <Divider />
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>

                    <Grid item  >
                        <Posts />
                        <Posts />
                        <Posts />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProfileInfo