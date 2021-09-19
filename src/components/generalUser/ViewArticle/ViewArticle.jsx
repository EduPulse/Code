import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Article from "../subComponents/article";
import UserInfo from "../subComponents/writerInfo";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, Link, Paper} from "@material-ui/core";
import axios from 'axios';
import PostComment from "./PostComment";
import DisplayComment from "./DisplayComment";
import PostReaction from "../subComponents/postReaction";
import ResentPosts from "../subComponents/resentPosts";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import APIURL from "../../API/APIURL";
import VersionWriters from "./VersionWriters";
import {user} from "../../auth/auth";

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
        paddingTop: 80,
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
    },
    warningMessage: {
        padding: 20,
        margin: "auto",
        marginBottom: 10,
        marginTop: 0,
        width: "98%",
        textAlign: "center",
        backgroundColor: "#f14040",
        color: "#fff",
        fontSize: 20
    }
}));

export default function ViewArticle() {
    const classes = useStyles();

    let [statePostData, setStatePostData] = useState([]);
    let [statePostCommentData, setStatePostCommentData] = useState([]);

    let postID = window.location.href.split('/').slice(-1)[0];
    let [statePostVersionData, setStatePostVersionData] = useState({});

    let postVersion = 0;
    if (postID.search("version=") !== -1) {
        postVersion = (Number(postID.split("?version=")[1]))
        postID = postID.split("?version=")[0];
    } else {
        postVersion = -1;
    }

    let userLevelVisibility = "Anyone";
    let userID = ""

    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
        if (userRole === "academic")
            userLevelVisibility = "Academic Only";
    }
    console.log(user())
    // TODO userID and userLevelVisibility should taken
    // userID = "60ed8d6597a4670ca060ed6b";


    const postInfo = {"_id": postID, "visibility": userLevelVisibility};
    let [stateIsNewVersion, setStateIsNewVersion] = useState(true);
    // data loading for post
    useEffect(() => {
        axios.post(APIURL("view_article/"), postInfo).then(function (response) {
            if (response.data) {
                // increase post view count
                setStatePostData(response.data)

                if (postVersion === -1)
                    postVersion = (response.data.article.versions.length - 1)
                // check is new version
                if ((response.data.article.versions.length - 1) === postVersion)
                    setStateIsNewVersion(false)

                // set post data
                console.log("post version:", response.data.article.versions)
                // if (postVersion === 0)
                //     setStatePostVersionData(response.data.article.current);
                // else
                setStatePostVersionData(response.data.article.versions[postVersion]);

                axios.post(APIURL("view_article/increase_view_count"), {"post_ID": postID}).then(function (response) {
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
    const urlGetCommentInfo = APIURL("post_comment/");
    useEffect(() => {
        axios.post(urlGetCommentInfo, postInfo).then(function (response) {
            setStatePostCommentData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // loading timeout
    const [timeOut, setTimeOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeOut(true);
        }, 5000);
    }, []);

// TODO version numbering mismatch is there look after setting up the saving API
    if (statePostData.length !== 0) {

        return (
            <div>
                {/*<AcademicUserGeneralNav className={classes.navBar}/>*/}
                <div className={classes.pageContent}>
                    {
                        stateIsNewVersion ? (
                            <div className={classes.warningMessage}>
                                You are looking at an old version of this article. Click <Link href={postID}
                                                                                               style={{color: "#fff"}}>here</Link> to
                                look at the latest version.
                            </div>
                        ) : (
                            <span/>
                        )
                    }
                    <Grid container spacing={3}>
                        <Grid item xs={8} className={classes.article}>
                            <Article
                                userID={userID}
                                type={statePostData.type}
                                articleID={statePostData._id}
                                coverImage={statePostVersionData.coverImage}
                                title={statePostVersionData.title}
                                content={statePostVersionData.content}
                                licence={statePostData.article.license}
                                tagList={statePostVersionData.tags} customWidth={"98%"}/>

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
                                      university={statePostData.academicInstitute.name}
                                      writerID={statePostData.author._id}
                                      viewerID={userID}
                                      status={statePostData.author.status}/>

                            <br/>
                            <PostReaction userID={userID} postID={postID} postData={statePostData.article}
                                          viewCount={statePostData.viewCount} postType={statePostData.type}/>
                            <br/>
                            <VersionWriters versionData={statePostData.article.versions} postID={postID}/>
                            <br/>
                            <ResentPosts authorID={statePostData.author._id} postID={postID}
                                         authorName={statePostData.author.name}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    } else {
        if (timeOut)
            return (
                <div>
                    <h2 style={{
                        margin: "auto",
                        paddingTop: 200,
                        fontSize: 50,
                        textAlign: "center",
                    }}>
                        <SentimentVeryDissatisfiedIcon fontSize={"large"}/> Sorry, This article is not visible for
                        you.<br/>
                        <small>Try again, if you are not login with the system.</small><br/>
                    </h2>
                </div>
            )
        else
            return (
                <div style={{paddingTop: 250,}}>
                    <CircularProgress/>
                </div>
            )
    }
}
