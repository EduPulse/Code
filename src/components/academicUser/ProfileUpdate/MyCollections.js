import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {makeStyles} from '@material-ui/core';
import CollectionPostList from './CollectionPostList';
import APIURL from '../../API/APIURL'
import {user} from "../../auth/auth";

const useStyles = makeStyles((theme) => ({
    collectionName: {
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

    return (
        <div>
            {
                collection.map(collectionData =>
                    <div>
                        <p className={classes.collectionName}>{collectionData.name}</p>
                        {
                            collectionData.savedPosts.map(post =>
                                <CollectionPostList
                                    postID={post.postId}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MyCollections
