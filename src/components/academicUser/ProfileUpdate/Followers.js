import React, {useEffect, useState} from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import {Card, makeStyles} from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
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

function Followers() {

    const classes = useStyles();

    const followerID = user()._id;
    const [followedBy, setfollowedBy] = useState([])
    const url_getFollowedBy = APIURL("loggedIn_User/get_followedBy");
    useEffect(() => {
        axios.post(url_getFollowedBy, {user_id: followerID}).then(function (response) {
            if (response.data)
                setfollowedBy(response.data);
        }).catch(function () {
            console.error("Followed By loading failed");
        })
    }, []);
    let followedByCount = 0;
    followedBy.map(follower => followedByCount = followedByCount + 1);

    const followersNames = followedBy.map(follower => {
        if (followedByCount == 0) {
            return (
                <div>
                    <Card className={classes.cardStyles}>
                        <SentimentVeryDissatisfiedIcon className={classes.iconStyles}/>
                        <p className={classes.textStyle}>You have no followers yet.</p>
                    </Card>
                </div>
            )
        } else {
            return (
                <UserCard
                    userID={follower}
                />
            )
        }
    });

    return (
        <div>
            {followersNames}
        </div>
    )
}

export default Followers
