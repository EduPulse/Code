import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Card, makeStyles} from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CollectionPostList from './CollectionPostList';
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

function MyCollections() {

    const classes = useStyles();

    const userID = user()._id;
    const [collection, setcollection] = useState([])
    const url_getCollection = APIURL("loggedIn_User/get_collection");
    useEffect(() => {
        axios.post(url_getCollection, {user_id: userID}).then(function (response) {
            if (response.data)
                setcollection(response.data);
        }).catch(function () {
            console.error("Author collection loading failed");
        })
    }, []);
    let collectionCount = 0;
    collection.map(c => {
        collectionCount = collectionCount + 1
    })

    const collecionSet = collection.map(singleCollection => {

        if (collectionCount == 0) {
            return (
                <div>
                    <Card className={classes.cardStyles}>
                        <SentimentVeryDissatisfiedIcon className={classes.iconStyles}/>
                        <p className={classes.textStyle}>You have not created any collections yet.</p>
                    </Card>
                </div>
            )
        } else {
            const postDetails = singleCollection.savedPosts.map(post => {
                // console.log("post: ", post)
                return (
                    <div>
                        <CollectionPostList
                            postID={post.postId}
                        />
                    </div>
                )
            })

            return (
                <div>
                    {postDetails}
                </div>
            )
        }
    });

    return (
        <div>
            {collecionSet}
        </div>
    )
}

export default MyCollections
