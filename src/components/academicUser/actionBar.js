import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import GradeIcon from '@material-ui/icons/Grade';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';


export default function ViewArticleActionBar(userID, postID) {
    console.log(userID, postID)
    // like,dislike,pin,add to library
    let [stateButtons, setstateButtons] = useState(["#000", "#000", "#000", "#000"]);

    // check already liked or disliked
    const urlCheckLikedDisliked = "http://localhost:9000/vote_for_post/is_reacted";
    let data = {
        "user_ID": userID,
        "like_dislike": "like",
        "post_ID": postID
    };

    useEffect(() => {
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if (response.data.is_upvoted) {
                let buttonColor = stateButtons;
                buttonColor[0] = "#935FF9";
                setstateButtons(buttonColor)
            }
        }).catch(function () {
            console.error("load failed likes");
        })
    }, []);
    data = {
        "user_ID": userID,
        "like_dislike": "dislike",
        "post_ID": postID
    };
    useEffect(() => {
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if (response.data.is_downvoted) {
                let buttonColor = stateButtons;
                buttonColor[1] = "#935FF9";
                setstateButtons(buttonColor)
            }
        }).catch(function () {
            console.error("load failed dislikes");
        })
    }, []);

    // events
    const thumpsUp = (event) => {
        const urlVote = "http://localhost:9000/vote_for_post/";
        const data = {
            "user_ID": userID,
            "like_dislike": "like",
            "post_ID": postID
        };
        if (stateButtons[0] === "#000")
            axios.post(urlVote, data).then(function (response) {
                console.log("Thumps up recorded.");
                let buttonColor = stateButtons;
                buttonColor[0] = "#935FF9";
                buttonColor[1] = "#000";
                setstateButtons(buttonColor)
                console.log(stateButtons)
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
        if (stateButtons[1] === "#000")
            axios.post(urlVote, data).then(function (response) {
                console.log("Thumps down recorded.");
                let buttonColor = stateButtons;
                buttonColor[0] = "#000";
                buttonColor[1] = "#935FF9";
                setstateButtons(buttonColor)
                console.log(stateButtons)
            }).catch(function () {
                console.log("Thumps down not recorded.");
            })
    };

    return (
        <Grid container spacing={3} style={{marginTop: 5}}>
            <Grid item xs={2}>
                <Button onClick={thumpsUp}>
                    <ThumbUpIcon fontSize={"large"} style={{color: stateButtons[0]}}/>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={thumpsDown}>
                    <ThumbDownIcon fontSize={"large"} style={{color: stateButtons[1]}}/>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button>
                    <GradeIcon fontSize={"large"}/>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button>
                    <ShareIcon fontSize={"large"}/>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button>
                    <CloudDownloadIcon fontSize={"large"}/>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button>
                    <BookmarkIcon fontSize={"large"}/>
                </Button>
            </Grid>
        </Grid>
    )
}
