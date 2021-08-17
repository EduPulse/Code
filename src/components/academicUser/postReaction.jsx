import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import FlagIcon from '@material-ui/icons/Flag';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';
import {Card} from "@material-ui/core";


export default function PostReaction({userID,postID,postData}) {
    // like,dislike,pin,add to library
    let [stateLike, setStateLike] = useState("#000");
    let [stateDislike, setStateDislike] = useState("#000");
    let [statePin, setStatePin] = useState("#000");
    let [stateAddToLibrary, setStateAddToLibrary] = useState("#000");

    // like dislike pin count
    let likeCount=0
    let dislikeCount=0
    let pinCount=0
    postData.upvotes.map(data=>likeCount++)
    postData.downvotes.map(data=>dislikeCount++)
    postData.pinnedBy.map(data=>pinCount++)

    // check already liked or disliked
    const urlCheckLikedDisliked = "http://localhost:9000/vote_for_post/is_reacted";

    useEffect(() => {
        let data = {
            "user_ID": userID,
            "like_dislike": "like",
            "post_ID": postID
        };
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if (response.data.is_upvoted) {
                setStateLike("#935FF9")
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    useEffect(() => {
        let data = {
            "user_ID": userID,
            "like_dislike": "dislike",
            "post_ID": postID
        };
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if (response.data.is_downvoted) {
                setStateDislike("#935FF9")
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlCheckLikedDisliked]);

    // Add to library
    const urlAvailability = "http://localhost:9000/add_to_library/is_available_at_library";
    useEffect(() => {
        let data = {
            "post_ID": postID,
            "user_ID": userID,
        };
        axios.post(urlAvailability, data).then(function (response) {
            if(response.data.post_available)
                setStateAddToLibrary("#935FF9")
        }).catch(function () {
            console.error("collection availability check failed");
        })
    }, [urlAvailability]);

    // events
    const thumpsUp = (event) => {
        const urlVote = "http://localhost:9000/vote_for_post/";
        const data = {
            "user_ID": userID,
            "like_dislike": "like",
            "post_ID": postID
        };
        if (stateLike === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce dislike count if needed
                if(stateDislike==="#935FF9")
                    dislikeCount--;
                // color changing
                setStateLike("#935FF9");
                setStateDislike("#000");
                // like count increase
                likeCount++;
                console.log("Thumps up recorded.");
            }).catch(function () {
                console.log("Thumps up not recorded.");
            })
    };

    const thumpsDown = (event) => {
        const urlVote = "http://localhost:9000/vote_for_post/";
        const data = {
            "user_ID": userID,
            "like_dislike": "dislike",
            "post_ID": postID
        };
        if (stateDislike === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce like count if needed
                if(stateLike==="#935FF9")
                    likeCount--;
                // color changing
                setStateLike("#000");
                setStateDislike("#935FF9");
                // increase dislike count
                dislikeCount++;
                console.log("Thumps down recorded.");
            }).catch(function () {
                console.log("Thumps down not recorded.");
            })
    };

    return (
        <Card style={{width: "80%"}}>
            <Grid container spacing={3} style={{paddingTop:10,paddingBottom:10,textAlign:"center"}}>
                <Grid item xs={4}>
                    <Button onClick={thumpsUp}>
                        <ThumbUpIcon fontSize={"large"} style={{color: stateLike}}/>
                    </Button>
                    <br/><span>{likeCount} Up-votes</span>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={thumpsDown}>
                        <ThumbDownIcon fontSize={"large"} style={{color: stateDislike}}/>
                    </Button>
                    <br/><span>{dislikeCount} Down-votes</span>

                </Grid>
                <Grid item xs={4}>
                    <Button>
                        <FlagIcon fontSize={"large"}/>
                    </Button>
                    <br/><span>{pinCount} Post pins</span>
                </Grid>
                <Grid item xs={4}>
                    <Button>
                        <ShareIcon fontSize={"large"}/>
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button>
                        <CloudDownloadIcon fontSize={"large"}/>
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button>
                        <BookmarkIcon fontSize={"large"} style={{color: stateAddToLibrary}}/>
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}
