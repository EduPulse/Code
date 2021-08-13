import React, {useEffect, useState} from 'react';
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";
import UserInfo from "./writerInfo";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper} from "@material-ui/core";
import axios from 'axios';
import PostComment from "./PostComment";
import DisplayComment from "./DisplayComment";
import PostReaction from "./postReaction";
import ResentPosts from "./resentPosts";


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

    if (statePostData.length !== 0) {
        return (
            <div>
                <AcademicUserGeneralNav className={classes.navBar}/>
                <div className={classes.pageContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} className={classes.article}>

                            <Article
                                articleID={statePostData._id}
                                coverImage={statePostData.article.versions[0].coverImage}
                                title={statePostData.article.versions[0].title}
                                content={statePostData.article.versions[0].content}
                                licence={statePostData.article.license}
                                tags={statePostData.article.versions[0].tags} customWidth={"98%"}/>

                            <Grid container spacing={3}>

                                <Grid item xs={4} />
                                <Paper style={{width: "98%", margin: 30,marginLeft:40,padding:15,}}>
                                    <Typography variant={"h4"} component={"h4"}>Comments...</Typography>
                                    <div>
                                        {/*TODO check system save user name pp like info in not generate them using id */}
                                        {userID ? (
                                            <PostComment name={"Saman Kumar"} userID={userID} postID={postID}
                                                         parentComment={true}
                                                         profilePic={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
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
                        <Grid item xs={4}>
                            <UserInfo name={statePostData.author.name} bio={statePostData.author.bio}
                                      profileURL={statePostData.author.profilePicture} className={classes.userInfo}
                                      university={statePostData.author.university}
                                      status={statePostData.author.status}/>

                            <br/>
                            <PostReaction userID={userID} postID={postID} postData={statePostData.article}/>
                            
                            <br/>

                            <ResentPosts userID={userID} postID={postID} author={statePostData.author.name}/>
                        </Grid>
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
