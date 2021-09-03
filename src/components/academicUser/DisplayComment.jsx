import React, {useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";
import APIURL from "../API/APIURL";
import DoReport from "./subComponents/doReport";

const useStyles = makeStyles({
    root: {
        width: "100%",
        borderRadius: 15,
        height: "fit-content",
        paddingBottom: -10,
        marginBottom: 0,
        marginTop: 10,
    },
    actions: {
        paddingTop: 12,
        marginBottom: 0,
        paddingBottom: 0,
    }
});


export default function DisplayComment({
                                           writerID,
                                           sessionUser,
                                           postID,
                                           commentID,
                                           timestamp,
                                           content,
                                           likes,
                                           dislikes
                                       }) {
    const classes = useStyles();

    let enableOption = true;
    if (sessionUser === "")
        enableOption = false

    // like dislike count and user put like or not
    const [stateUserLiked, setStateUserLiked] = useState("#000");
    const [stateUserDisliked, setStateUserDisliked] = useState("#000");

    let [likeCount, setLikeCount] = useState(0);
    let [dislikeCount, setDislikeCount] = useState(0);


    useEffect(() => {
        likes.map(data => {
            if (typeof data.by !== 'undefined')
                setLikeCount(++likeCount)
            if (sessionUser !== "" && data.by === sessionUser)
                setStateUserLiked("#935ff9")
        })
        dislikes.map(data => {
            if (typeof data.by !== 'undefined')
                setDislikeCount(++dislikeCount)
            if (sessionUser !== "" && data.by === sessionUser)
                setStateUserDisliked("#935ff9")
        })
    }, [])

    // get writer information
    const [stateUserData, setStateUserData] = useState([]);
    const urlGetUserInfo = APIURL("get_user_data/");
    const userID = {"_id": writerID};

    useEffect(() => {
        axios.post(urlGetUserInfo, userID).then(function (response) {
            setStateUserData(response.data[0]);
        })
            .catch(function () {
                console.error("load failed");
            })
    }, []);


    const thumpsUp = (event) => {
        const urlVote = APIURL("vote_for_comment/");
        const data = {
            "user_ID": sessionUser,
            "like_dislike": "like",
            "post_ID": postID,
            "comment_ID": commentID
        };
        if (stateUserLiked === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce dislike count if needed
                if (stateUserDisliked === "#935FF9")
                    setDislikeCount(--dislikeCount)
                // color changing
                setStateUserLiked("#935FF9");
                setStateUserDisliked("#000");
                // like count increase
                setLikeCount(++likeCount)
                console.log("Thumps up recorded.");
            }).catch(function () {
                console.log("Thumps up not recorded.");
            })
    };

    const thumpsDown = (event) => {
        const urlVote = APIURL("vote_for_comment/");
        const data = {
            "user_ID": sessionUser,
            "like_dislike": "dislike",
            "post_ID": postID,
            "comment_ID": commentID
        };
        if (stateUserDisliked === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce like count if needed
                if (stateUserLiked === "#935FF9")
                    setLikeCount(--likeCount)
                // color changing
                setStateUserLiked("#000");
                setStateUserDisliked("#935FF9");
                // increase dislike count
                setDislikeCount(++dislikeCount)
                console.log("Thumps down recorded.");
            }).catch(function () {
                console.log("Thumps down not recorded.");
            })
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent style={{paddingBottom: 0}}>
                <CardHeader style={{paddingTop: 0,}}
                            avatar={
                                <Avatar alt="Remy Sharp" src={stateUserData.profilePicture}/>
                            }
                            title={stateUserData.name}
                            subheader={timestamp}
                />
                <div>
                        <span id="outlined-basic" label="Comment"
                              style={{width: "100%", paddingLeft: 12, fontSize: 18, textAlign: "justify"}}>
                            {content}
                        </span>
                </div>
                <Grid container spacing={3} className={classes.actions}>
                    <Grid item xs={8}/>
                    <Grid item xs={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <Button onClick={thumpsUp} disabled={!enableOption}>
                                    <span><ThumbUpIcon style={{color: stateUserLiked}}/><br/>{likeCount}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={thumpsDown} disabled={!enableOption}>
                                    <span><ThumbDownIcon style={{color: stateUserDisliked}}/><br/>{dislikeCount}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <DoReport userID={sessionUser} objectID={postID} goingToReport={"comment"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}