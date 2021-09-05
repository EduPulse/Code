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

    const [userData, setUserData] = useState([]);
    const userID = "60ed8d6597a4670ca060ed6b";
    const userInfo = {"_id": userID};
    console.log(userInfo);

    const urlGetLoggedinUser = "http://localhost:9000/loggedIn_User";
    useEffect(() => {
        axios.post(urlGetLoggedinUser, userInfo).then(function (response) {
            setUserData(response.data);
        }).catch(function () {
            console.error("Profile details loading failed");
        })
    }, []);

    return (
        <div>
            <div>
                <Card className={useStyles().root}>

                    <CardContent>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Avatar alt="Profile image" className={useStyles().avatar}
                                        src={userData.profilePicture}/>
                            </Grid>

                            <Grid item>
                                <Button aria-label="recipe" className={useStyles().buttonStyle}>
                                    <Link className={useStyles().linkStyles}
                                          to="/components/academicUser/UpdateProfile">
                                        Edit Profile
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>

                        <Typography gutterBottom variant="h5" component="h2" className={useStyles().typographyStyle}>
                            {userData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"
                                    className={useStyles().typographyStyle}>
                            <p>{userData.bio}</p>
                            {/* <p>{userData.university}</p>
              <p>{userData.faculty}</p> */}
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
                                    {/* <p>{userData.posts.lenght} posts created</p> */}
                                    <p>20 posts created</p>
                                    {/* <p>{userData.followingTags.lenght} tags following</p> */}
                                    <p>10 tags following</p>
                                    {/* <p>{userData.followedBy.lenght} followers</p> */}
                                    <p>200 followers</p>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item>
                        <p>{window.theme}</p>
                        <Posts/>
                        <Posts/>
                        <Posts/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProfileInfo