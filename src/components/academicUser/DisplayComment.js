import React, {useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ReportIcon from '@material-ui/icons/Report';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";
import PostComment from "./PostComment";

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

    // like dislike count and user put like or not
    const [stateUserLiked, setStateUserLiked] = useState("#000");
    const [stateUserDisliked, setStateUserDisliked] = useState("#000");

    let [likeCount, setLikeCount] = useState(0);
    let [dislikeCount, setDislikeCount] = useState(0);

    useEffect(() => {
        likes.map(data => {
            setLikeCount(likeCount++)
            if (sessionUser && data.user_ID === sessionUser)
                setStateUserLiked("#935ff9")
        })
        dislikes.map(data => {
            setDislikeCount(dislikeCount++)
            if (sessionUser && data.user_ID === sessionUser)
                setStateUserDisliked("#935ff9")
        })
    }, [])

    // get writer information
    const [stateUserData, setStateUserData] = useState([]);
    const urlGetUserInfo = "http://localhost:9000/get_user_data/";
    const userID = {"_id": writerID};

    useEffect(() => {
        axios.post(urlGetUserInfo, userID).then(function (response) {
            setStateUserData(response.data[0]);
        })
            .catch(function () {
                console.error("load failed");
            })
    }, []);

    // events sub comment handling TODO NF
    const createReplyComment = (event) => {
        return (
            <PostComment name={"Saman Kumar"} userID={userID} postID={""}
                         parentComment={true}
                         profilePic={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
        )
    }

    const thumpsUp = (event) => {
        const urlVote = "http://localhost:9000/vote_for_comment/";
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
                    setDislikeCount(dislikeCount--)
                // color changing
                setStateUserLiked("#935FF9");
                setStateUserDisliked("#000");
                // like count increase
                setLikeCount(likeCount++)
                console.log("Thumps up recorded.");
            }).catch(function () {
                console.log("Thumps up not recorded.");
            })
    };

    const thumpsDown = (event) => {
        const urlVote = "http://localhost:9000/vote_for_comment/";
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
                    setLikeCount(likeCount--)
                // color changing
                setStateUserLiked("#000");
                setStateUserDisliked("#935FF9");
                // increase dislike count
                setDislikeCount(dislikeCount++)
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
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Button onClick={thumpsUp}>
                                    <span><ThumbUpIcon style={{color: stateUserLiked}}/><br/>{likeCount}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3} onClick={thumpsDown}>
                                <Button>
                                    <span><ThumbDownIcon style={{color: stateUserDisliked}}/><br/>{dislikeCount}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={createReplyComment}>
                                    <span><AddCommentIcon/></span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button>
                                    <span><ReportIcon/></span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}