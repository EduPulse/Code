import React, {useEffect, useState} from 'react';
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";
import UserInfo from "./writerInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import FlagIcon from '@material-ui/icons/Flag';
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';
import PostComment from "./PostComment";
import DisplayComment from "./DisplayComment";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
        position: "absolute",
    },
    pageContent: {
        paddingTop: 100,
    },
    article: {
        width: "50%",
    },
    userInfo: {
        left: 0,
    },
    ccImage: {
        width: 100,
        display: "block",
        paddingTop: 20,
        float: "right",
        paddingRight: -80,
    },
    downloadButton: {
        padding: 8,
        color: "#fff",
        borderRadius: 5,
        display: "block",
        marginTop: 20,
        float: "left",
        backgroundColor: "#935FF9",
    }
}));

export default function ViewArticle() {
    const classes = useStyles();

    let [statePostData, setStatePostData] = useState([]);
    let [statePostCommentData, setStatePostCommentData] = useState([]);

    const postID = window.location.href.split('/').slice(-1)[0];
    const userID = "60ecfe51395a1704a42d8cae";
    const postInfo = {"_id": postID};

    // data loading for post
    const urlGetPostInfo = "http://localhost:9000/view_article/";
    useEffect(() => {
        axios.post(urlGetPostInfo, postInfo).then(function (response) {
            setStatePostData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlGetPostInfo]);

    // data loading for comment
    const urlGetCommentInfo = "http://localhost:9000/post_comment/";
    useEffect(() => {
        axios.post(urlGetCommentInfo, postInfo).then(function (response) {
            setStatePostCommentData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlGetCommentInfo]);

    // like,dislike,pin,add to library
    let [stateButtons, setstateButtons] = useState(["#000", "#000", "#000", "#000"]);

    // check already liked or disliked
    const urlCheckLikedDisliked = "http://localhost:9000/vote_for_post/is_reacted/";
    let data = {
        "user_ID": userID,
        "like_dislike": "like",
        "post_ID": postID
    };
    useEffect(() => {
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if(response.data.is_upvoted){
                let buttonColor = stateButtons;
                buttonColor[0] = "#935FF9";
                setstateButtons(buttonColor)
            }

        }).catch(function () {
            console.error("load failed");
        })
    }, []);
    data = {
        "user_ID": userID,
        "like_dislike": "dislike",
        "post_ID": postID
    };
    useEffect(() => {
        axios.post(urlCheckLikedDisliked, data).then(function (response) {
            if(response.data.is_downvoted){
                let buttonColor = stateButtons;
                buttonColor[1] = "#935FF9";
                setstateButtons(buttonColor)
            }
        }).catch(function () {
            console.error("load failed");
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
        if(stateButtons[0]==="#000")
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
        if(stateButtons[1]==="#000")
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

    if (statePostData.length != 0 && statePostCommentData.length != 0) {
        return (
            <div>
                <AcademicUserGeneralNav className={classes.navBar}/>
                <div className={classes.pageContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={6} className={classes.article}>

                            <Article
                                articleID={statePostData._id}
                                coverImage={statePostData.article.versions[0].coverImage}
                                title={statePostData.article.versions[0].title}
                                content={statePostData.article.versions[0].content}
                                tags={statePostData.article.versions[0].tags} customWidth={"100%"}/>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>

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
                                                <FlagIcon fontSize={"large"}/>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <a href={"https://creativecommons.org/about/cclicenses/"} target={"_blank"}
                                       style={{textDecoration: "none"}}>
                                        <img className={classes.ccImage}
                                             src={'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/' + statePostData.article.license + '.png'}
                                        />
                                    </a>
                                </Grid>

                                <Paper style={{width: "100%", padding: 15,}}>
                                    <Typography variant={"h4"} component={"h4"}>Comments...</Typography>
                                    <div>
                                        {/*TODO check system save user name pp like info in not generate them using id */}
                                        <PostComment name={"Saman Kumar"} userID={userID} postID={postID} parentComment={true}
                                                     profilePic={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>

                                        {statePostCommentData.map(data =>
                                            <DisplayComment content={data.content} dislikes={""}
                                                            writerID={data.commenter}
                                                            timestamp={data.updatedAt} comments={""} likes={""}
                                                            reports={""}/>
                                        )}

                                    </div>
                                </Paper>
                            </Grid>

                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={6}>

                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <UserInfo name={statePostData.author.name} bio={statePostData.author.bio}
                                      profileURL={statePostData.author.profilePicture} className={classes.userInfo}
                                      university={statePostData.author.university}
                                      status={statePostData.author.status}/>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}
