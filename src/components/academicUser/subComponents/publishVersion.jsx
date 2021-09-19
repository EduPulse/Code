import React from 'react';
import axios from 'axios';
import {CircularProgress} from "@material-ui/core";
import APIURL from "../../API/APIURL";

export default function PublishVersion({jsonObject, postID}) {

    console.log(jsonObject)

    axios.post(APIURL("write_article/publish_post_version"), jsonObject).then(function (response) {
        console.log("publish_post_version done ")
        // redirect to the article view
        window.location.href = "/components/academicUser/viewArticle/" + postID
    }).catch(function () {
        console.error("publish_post_version failed");
    });
    return (
        <div style={{margin: 40}}>
            <CircularProgress/>
        </div>
    )
}
