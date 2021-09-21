import React, {useState, useEffect } from 'react'
import axios from 'axios';
import APIURL from '../../API/APIURL'

function CollectionPostList({ postID }) {

    const [post_id, setpost_id] = useState(postID)
    const [postDetails, setpostDetails] = useState([])
    const url_getPost = APIURL("view_article");
    useEffect(() => {
        axios.post(url_getPost, {_id: post_id, visibility: "Academic Only"}).then(function (response) {
            if (response.data)
                setpostDetails(response.data);
        }).catch(function () {
            console.error("Post loading failed");
        })
    }, []);

    return (
        <div>
            <h1>{post_id}</h1>
            <h1>{postDetails.title}</h1>
            <h1>{postDetails.content}</h1>
            <h1>{postDetails.readTime}</h1>
        </div>
    )
}

export default CollectionPostList
