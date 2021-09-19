import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, makeStyles, Typography,} from '@material-ui/core';
import axios from 'axios';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import APIURL from '../API/APIURL'

const useStyles = makeStyles({
    cardStyles: {
        width: '300px',
        padding: 10
    },
    userBasicDetails: {
        textAlign: 'center',
        fontSize: 16
    },
    iconStyles: {
        color: '#4411A8',
        marginRight: 20,
        // marginTop: 15
    }
});

function AuthorBasicDetails({postCount}) {

    const authorId = '60ecfe51395a1704a42d8cae';

    const [tagstList, settagsList] = useState([])
    const url_getUserTags = APIURL("loggedIn_User/get_all_tags");
    useEffect(() => {
        axios.post(url_getUserTags, {user_id: authorId}).then(function (response) {
            if (response.data)
                settagsList(response.data);
        }).catch(function () {
            console.error("Tags loading failed");
        })
    }, []);
    let tagsCount = 0;
    tagstList.map(tag => tagsCount = tagsCount + 1);

    const [followingUsers, setfollowingUsers] = useState([])
    const url_getFollowingUsers = APIURL("loggedIn_User/get_followingUsers");
    useEffect(() => {
        axios.post(url_getFollowingUsers, {user_id: authorId}).then(function (response) {
            if (response.data)
                setfollowingUsers(response.data);
        }).catch(function () {
            console.error("Following Users loading failed");
        })
    }, []);
    let followingUserCount = 0;
    followingUsers.map(followingUser => followingUserCount = followingUserCount + 1);

    const [followedBy, setfollowedBy] = useState([])
    const url_getFollowedBy = APIURL("loggedIn_User/get_followedBy");
    useEffect(() => {
        axios.post(url_getFollowedBy, {user_id: authorId}).then(function (response) {
            if (response.data)
                setfollowedBy(response.data);
        }).catch(function () {
            console.error("Followed By loading failed");
        })
    }, []);
    let followedByCount = 0;
    followedBy.map(follower => followedByCount = followedByCount + 1);

    return (
        <div>
            <Card className={useStyles().cardStyles}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"
                                className={useStyles().userBasicDetails}>
                        <p><DescriptionIcon className={useStyles().iconStyles}/>
                            Posts created: {postCount}
                        </p>
                        <Divider/>
                        <p><LocalOfferIcon className={useStyles().iconStyles}/>
                            Tags following: {tagsCount}
                        </p>
                        <Divider/>
                        <p><PeopleIcon className={useStyles().iconStyles}/>
                            Following authors: {followingUserCount}
                        </p>
                        <Divider/>
                        <p><PeopleAltIcon className={useStyles().iconStyles}/>
                            Followed by: {followedByCount}
                        </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthorBasicDetails
