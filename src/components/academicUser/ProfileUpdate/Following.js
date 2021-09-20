import React, {useEffect, useState} from 'react'
import {Card, makeStyles} from '@material-ui/core';
import UserCard from './UserCard';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import APIURL from '../../API/APIURL'
import {user} from "../../auth/auth";

const useStyles = makeStyles((theme) => ({
    cardStyles: {
        backgroundColor: '#E1D4FC',
        height: '250px',
        borderRadius: '15px'
    },
    iconStyles: {
        width: '100px',
        height: '100px',
        marginTop: '40px',
        marginLeft: '150px',
        color: '#935FF9',
    },
    textStyle: {
        fontSize: '24px',
        textAlign: 'center'
    }
}))

function Following({userID}) {

    const classes = useStyles();

    const logggedInUserId = user()._id;
    // const logggedInUserId = userID;
    const [followingUsers, setfollowingUsers] = useState([])
    const url_getFollowingUsers = APIURL("loggedIn_User/get_followingUsers");
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

    const followingAuthors = followingUsers.map(followingUser => {
        if (followingUserCount == 0) {
            return (
                <div>
                    <Card className={classes.cardStyles}>
                        <InfoIcon className={classes.iconStyles} />
                        <p className={classes.textStyle} >You are not following any authors yet!</p>
                    </Card>
                </div>
            )
        } else {
            return (
                <UserCard 
                    userID = {followingUser._id}
                />
            )
        }
    });

    return (
        <div>
            { followingAuthors }
        </div>
    )
}

export default Following
