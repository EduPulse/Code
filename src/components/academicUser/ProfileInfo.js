import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Post from './Post'
import AuthorBasicDetails from './AuthorBasicDetails';
import ScoailProfilesBar from './ScoailProfilesBar';
import APIURL from '../API/APIURL'
import {user} from "../auth/auth";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '77%',
        marginLeft: 150,
        borderRadius: 5,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginBottom: '10px',
        marginLeft: '120px',
        width: 80,
        height: 80,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19)'
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
        // marginLeft: 15,
    },
    cardStyles: {
        width: '300px',
        padding: 10
    },
    userBasicDetails: {
        textAlign: 'left',
        fontSize: 16
    },
    iconStyles: {
        color: '#4411A8',
        marginRight: 20,
        // marginTop: 15
    }
});

function ProfileInfo() {

    const [profileData, setProfileData] = useState([])
    const logggedInUserId = user()._id;
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = APIURL("loggedIn_User");
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
            console.error("Profile loading failed");
        })
    }, []);

    const [postList, setpostList] = useState([])
    const url_getUserPosts = APIURL("loggedIn_User/get_all_publication");
    useEffect(() => {
        axios.post(url_getUserPosts, {user_id: logggedInUserId}).then(function (response) {
            if (response.data)
                setpostList(response.data);
        }).catch(function () {
            console.error("Posts loading failed");
        })
    }, []);
    let postCount = 0;
    postList.map(post => postCount = postCount + 1);

    const displayPosts = postList.map(post => {
        if (post.article)
            return (
                <Post
                    author={profileData.name}
                    profilePic={profileData.profilePicture}
                    title={post.article.current.title}
                    coverImg={post.article.current.coverImage}
                    readTime={post.article.current.readTime}
                />
            )
        else
            return (
                <Post
                    author={profileData.name}
                    profilePic={profileData.profilePicture}
                    title={post.pin.originalPost.article.current.title}
                    coverImg={post.pin.originalPost.article.current.coverImage}
                    readTime={post.pin.originalPost.article.current.readTime}
                />
            )
    })

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

                            <Grid item>
                                <Button aria-label="recipe" className={useStyles().buttonStyle}>
                                    <Link className={useStyles().linkStyles}
                                          to={APIURL("/components/academicUser/UpdateProfile")}>
                                        Edit Profile
                                    </Link>
                                </Button>
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

                        <ScoailProfilesBar
                            // authorId = {profileData._id}
                        />

                    </CardContent>
                </Card>
            </div>

            <div>
                <Grid className={useStyles().secondGrid} container spacing={3} justifyContent="center">
                    <Grid item>
                        <AuthorBasicDetails
                            postCount={postCount}
                        />
                    </Grid>

                    <Grid item>
                        {displayPosts}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProfileInfo
