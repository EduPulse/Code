import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, Divider, Grid, makeStyles, Typography} from '@material-ui/core';
import axios from 'axios';
import Post from './Post'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '60%',
        marginLeft: 275,
        borderRadius: 30,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginBottom: '20px',
        marginLeft: '20px',
        width: 80,
        height: 80,
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        marginTop: 30,
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
        fontSize: '16px'
    },
    title: {
        textAlign: 'center',
        // fontFamily: 'Courgette',
        color: '#4411A8',
    },
    secondGrid: {
        marginTop: 10,
        marginLeft: 15,
    }
});

function AuthorProfile() {

    let authorId = window.location.href.split('/').slice(-1)[0];

    const [profileData, setProfileData] = useState([])
    //const authorId = '60ecfe51395a1704a42d8cae';
    const userData = {"_id": authorId}
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
        axios.post(url_getUserPosts, {user_id: authorId}).then(function (response) {
            if (response.data)
                setpostList(response.data);
        }).catch(function () {
        console.error("Posts loading failed");
        })
    }, []);
    let postCount = 0;
    postList.map(post => postCount = postCount + 1 );

    const displayPosts = postList.map (post => {
        return (
            <Post
                author = {profileData.name}
                profilePic = {profileData.profilePicture}
                title = {post.article.current.title}
                coverImg = {post.article.current.coverImage}
                readTime = {post.article.current.readTime}
            />
        )
    })

    const [tagstList, settagsList] = useState([])
    const url_getUserTags = "http://localhost:9000/loggedIn_User/get_all_tags";
    useEffect(() => {
        axios.post(url_getUserTags, {user_id: authorId}).then(function (response) {
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
        axios.post(url_getFollowingUsers, {user_id: authorId}).then(function (response) {
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
        axios.post(url_getFollowedBy, {user_id: authorId}).then(function (response) {
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

                    <CardContent>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Avatar alt="Profile image" className={useStyles().avatar}
                                        src={profileData.profilePicture}/>
                            </Grid>
                        </Grid>

                        <Typography gutterBottom variant="h5" component="h2" className={useStyles().title}>
                            {profileData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"
                                    className={useStyles().typographyStyle}>
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
                                <Typography variant="body2" color="textSecondary" component="p"
                                            className={useStyles().typographyStyle}>
                                    <p> Posts created: {postCount} </p>
                                    <Divider/>
                                    <p> Tags following: {tagsCount} </p>
                                    <Divider/>
                                    <p> Following authors: {followingUserCount} </p>
                                    <Divider/>
                                    <p> Followed by: {followedByCount} </p>
                                    <Divider/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item>
                        {displayPosts}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AuthorProfile
