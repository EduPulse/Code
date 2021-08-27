import React, {useEffect, useState} from 'react';
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";
import UserInfo from "./writerInfo";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import axios from 'axios';
import PostComment from "./PostComment";
import DisplayComment from "./DisplayComment";
import PostReaction from "./postReaction";
import ResentPosts from "./resentPosts";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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
    // TODO userID and userLevelVisibility should taken
    const userID = "60ed8d6597a4670ca060ed6b";
    const userLevelVisibility = "Academics Only";
    const postInfo = {"_id": postID, "visibility": userLevelVisibility};

    // data loading for post
    const urlGetPostInfo = "http://localhost:9000/view_article/";
    useEffect(() => {
        axios.post(urlGetPostInfo, postInfo).then(function (response) {
            if (response.data) {
                // increase post view count
                setStatePostData(response.data)
                const urlIncreaseViewCount = "http://localhost:9000/view_article/increase_view_count";
                axios.post(urlIncreaseViewCount, {"post_ID": postID}).then(function (response) {
                    if (response.data)
                        console.log("VC Update done.");
                }).catch(function () {
                    console.error("VCU failed");
                })
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, []);


    // data loading for comment
    const urlGetCommentInfo = "http://localhost:9000/post_comment/";
    useEffect(() => {
        axios.post(urlGetCommentInfo, postInfo).then(function (response) {
            setStatePostCommentData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    if (statePostData.length !== 0) {
        return (
            <div>
                <AcademicUserGeneralNav className={classes.navBar}/>
                <div className={classes.pageContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} className={classes.article}>
                            <Article
                                type={statePostData.type}
                                articleID={statePostData._id}
                                coverImage={statePostData.article.current.coverImage}
                                title={statePostData.article.current.title}
                                content={statePostData.article.current.content}
                                licence={statePostData.article.license}
                                tagList={statePostData.article.current.tags} customWidth={"98%"}/>

                            <Grid container spacing={3}>

                                <Grid item xs={4}/>
                                <Paper style={{width: "98%", margin: 30, marginLeft: 40, padding: 15,}}>
                                    <Typography variant={"h4"} component={"h4"}>Comments...</Typography>
                                    <div>
                                        {userID ? (
                                            <PostComment userID={userID} postID={postID}
                                                         parentComment={true}/>
                                        ) : (
                                            <span/>
                                        )}


                                        {statePostCommentData.map(data =>
                                            <DisplayComment content={data.content} dislikes={data.downvotes}
                                                            writerID={data.commenter}
                                                            sessionUser={userID}
                                                            commentID={data._id}
                                                            postID={postID}
                                                            timestamp={data.updatedAt} likes={data.upvotes}
                                            />
                                        )}

                                    </div>
                                </Paper>
                            </Grid>

                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}/>
                                    <Grid item xs={6}>

                                    </Grid>
                                    <Grid item xs={3}/>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={4} style={{paddingRight: "5%"}}>
                            <UserInfo name={statePostData.author.name} bio={statePostData.author.bio}
                                      profileURL={statePostData.author.profilePicture} className={classes.userInfo}
                                      university={statePostData.author.university}
                                      writerID={statePostData.author._id}
                                      viewerID={userID}
                                      status={statePostData.author.status}/>

                            <br/>
                            <PostReaction userID={userID} postID={postID} postData={statePostData.article}
                                          viewCount={statePostData.viewCount} postType={statePostData.type}/>
                            <br/>

                            <ResentPosts authorID={statePostData.author._id} postID={postID}
                                         authorName={statePostData.author.name}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2 style={{
                    margin: "auto",
                    paddingTop: 200,
                    fontSize: 50,
                    textAlign: "center",
                }}>
                    <SentimentVeryDissatisfiedIcon fontSize={"large"}/> Sorry, This article is not visible for you.<br/>
                    <small>Try again, if you are not login with the system.</small>
                </h2>
            </div>
        )
    }
}
