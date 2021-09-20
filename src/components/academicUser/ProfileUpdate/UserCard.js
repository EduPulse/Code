import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Avatar, Card, Grid, Link, makeStyles} from '@material-ui/core';
import APIURL from '../../API/APIURL'

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
    },
    cardStyle: {
        backgroundColor: '#E1D4FC',
        borderRadius: '5px',
        '&hover': {
            backgroundColor: '#935FF9',
        }
    },
    avatar: {
        backgroundColor: '#935FF9',
        width: '40px',
        height: '40px',
        margin: '15px',
        // marginBottom: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    name: {
        fontSize: '20px',
        textAlign: 'center'
    },
    bio: {
        fontSize: '12px',
        textAlign: 'center'
    },
    linkStyle: {
        '&:hover': {
            textDecoration: 'none',
        },
    }
});

function UserCard({userID}) {

    const [profileData, setProfileData] = useState([])
    const logggedInUserId = userID;
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = APIURL("loggedIn_User/");
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
            console.error("Profile loading failed");
        })
    }, []);

    return (
        <div className={useStyles().root}>
            <Link className={useStyles().linkStyle} href="http://localhost:3000/">
                <Card className={useStyles().cardStyle}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar alt="Profile image" className={useStyles().avatar}
                                    src={profileData.profilePicture}/>
                        </Grid>
                        <Grid item>
                            <p className={useStyles().name}>{profileData.name} </p>
                            {/* <p className={useStyles().bio} > { profileData.bio } </p> */}
                        </Grid>
                    </Grid>
                </Card>
            </Link>
        </div>
    )
}

export default UserCard
