import React, { useEffect, useState } from 'react'
import { Card, makeStyles } from '@material-ui/core';
import UserCard from './UserCard';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

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

function Following({ userID }) {

    const classes = useStyles();

    // const logggedInUserId = '60ecfe51395a1704a42d8cae';
    const logggedInUserId = userID;
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

    // const followingAuthors = () => {
    //     return (
    //         <div>
    //             <Card className={classes.cardStyles}>
    //                 {/* <SentimentVeryDissatisfiedIcon className={classes.iconStyles} /> */}
    //                 <InfoIcon className={classes.iconStyles} />
    //                 <p className={classes.textStyle} >You are not following any authors yet!</p>
    //             </Card>
    //         </div>
    //     )
    // }

    const followingAuthors = followingUsers.map(followingUser => {
        return (
            <UserCard 
                userID = {followingUser}
            />
        )
    });

    return (
        { followingAuthors }
    )
}

export default Following
