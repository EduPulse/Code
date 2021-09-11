import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import { Card } from '@material-ui/core';

function Followers({ userID }) {

    // var user = firebase.auth().currentUser;
    
    const followerID = userID;
    const [followedBy, setfollowedBy] = useState([])
    const url_getFollowedBy = "http://localhost:9000/loggedIn_User/get_followedBy";
    useEffect(() => {
        axios.post(url_getFollowedBy, {user_id: followerID}).then(function (response) {
            if (response.data)
                setfollowedBy(response.data);
        }).catch(function () {
        console.error("Followed By loading failed");
        })
    }, []);
    let followedByCount = 0;
    followedBy.map(follower => followedByCount = followedByCount + 1 );
    console.log("First follower: ", followedBy[0]);

    const followersNames = followedBy.map( follower =>  {
        return (
            <UserCard 
                userID = {follower}
            />
        )
        // if (followedByCount == 0) {
        //     return (
        //         <div>
        //             <Card>
        //                 <p>You have no followers yet.</p>
        //             </Card>
        //         </div>
        //     )
        // }
        // else {
        //     return (
        //         <UserCard 
        //             userID = {follower}
        //         />
        //         // <Card>
        //         //     <p>You have no followers yet.</p>
        //         // </Card>
        //     )
        // }
    });

    return (
        <div>
            { followersNames }
        </div>
    )
}

export default Followers
