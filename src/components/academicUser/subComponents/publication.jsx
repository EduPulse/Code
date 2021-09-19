import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    Paper,
    Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import APIURL from "../../API/APIURL";
import PublicSharpIcon from "@material-ui/icons/PublicSharp";
import PeopleSharpIcon from "@material-ui/icons/PeopleSharp";
import PostVersion from "./postVersion";
import PermMediaIcon from '@material-ui/icons/PermMedia';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles((theme) => ({
    postEntry: {
        padding: 15,
        borderRadius: 5,
        margin: "auto",
        marginBottom: 25,
    },
    bottomLine: {
        padding: 10,
        paddingTop: 12,
        paddingBottom: 5,
    },
    actionButton: {
        fontWeight: "bold",
    },
    postTitles: {
        fontWeight: "bold",
        float: "left"
    },
    publishedDate: {
        marginLeft: 5,
    },
    draftPost: {
        backgroundColor: "#4411A8",
        color: "#fff",
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
    }
}));

export default function Publication({postID, title, userID, postData, type}) {
    let likeCount = 0;
    let dislikeCount = 0;
    let viewCount = postData.viewCount;
    let commentCount = 0;
    // get view,like comment counts

    postData.article.upvotes.map(data => {
        if (typeof data.by !== 'undefined')
            likeCount++
    })
    postData.article.downvotes.map(data => {
        if (typeof data.by !== 'undefined')
            dislikeCount++
    })

    postData.comments.map(data => commentCount++)


    let [statePublishUnpublish, setStatePublishUnpublish] = useState("Unpublished");
    let [stateDrafted, setStateDrafted] = useState("none");

    useEffect(() => {
        if (postData.visibility === "hidden" || postData.article.status === "unpublished") {
            setStateDrafted("");
            setStatePublishUnpublish("Publish")
        } else {
            setStatePublishUnpublish("Unpublish")
        }
    }, [])

    const classes = useStyles();

    // events
    const loadForVersion = (event) => {
        const urlVersionInit = APIURL("post_version/");
        const data = {
            post_ID: postID,
            new_author_ID: userID,
        };

        axios.post(urlVersionInit, data).then(function (response) {
            console.log("post version initiated.")
            handleClose();
            // redirect to edit
            window.location.href = "/components/academicUser/ArticleVersioning/" + postID;
        }).catch(function () {
            console.log("not pinned.");
        })
    }
    const makePublishOrUnpublish = () => {
        let actionURL = "";
        if (statePublishUnpublish === "Unpublish") {
            // unpublish url
            actionURL = APIURL("dashboard_operation/unpublish_post");
            setStatePublishUnpublish("Publish")
            setStateDrafted("");
        } else {
            // publish url
            actionURL = APIURL("dashboard_operation/republish_post");
            setStatePublishUnpublish("Unpublish")
            setStateDrafted("none");
        }
        axios.post(actionURL, {"post_id": postID}).then(function (response) {
            console.log("action done");
            // window.location.reload()
        }).catch(function () {
            console.error("load failed");
        })
    }
    // delete option
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteFunction = () => {
        const urlDeletePost = APIURL("dashboard_operation/delete_post");
        axios.post(urlDeletePost, {"post_id": postID}).then(function (response) {
            console.log("post deleted");
            setOpen(false);
            window.location.reload();
        }).catch(function () {
            console.error("load failed");
        })

    }

    const [statePostVisibility, setStatePostVisibility] = React.useState("Anyone");
    useEffect(() => {
        if (postData.visibility === "Academics Only")
            setStatePostVisibility("Academics Only")
    }, []);

    const changeVisibility = () => {
        let postVisibility;
        if (statePostVisibility === "Anyone")
            postVisibility = "Academics Only"
        else
            postVisibility = "Anyone"


        axios.post(APIURL("dashboard_operation/change_post_visibility"), {
                "post_id": postID,
                "new_visibility": postVisibility
            }
        ).then(function (response) {
            console.log("visibility changed");
            setStatePostVisibility(postVisibility)
        }).catch(function () {
            console.error("visibility not changed");
        })
    }

    return (
        <div>
            <Paper className={classes.postEntry}>
                <Grid container spacing={3}>
                    <Grid item xs={11} style={{textAlign: "left"}}>
                        <Typography variant="h5" component="h5" className={classes.postTitles}>
                            <Link href={'/components/academicUser/viewArticle/' + postID}
                                  style={{textDecoration: "none"}}>
                                <span style={{paddingRight: 10}}>
                                    {
                                        type === "document" ? (
                                            <PermMediaIcon/>
                                        ) : (
                                            <BookIcon/>
                                        )
                                    }
                                </span>
                                <span>
                                    {title}
                                </span>
                            </Link>
                        </Typography><br/>
                    </Grid>
                    <Grid item xs={1}>
                        <span onClick={changeVisibility} style={{cursor: "pointer"}}>
                            {
                                statePostVisibility === "Anyone" ? (
                                    <Tooltip
                                        title="Post can view any user of the system click hear to change it into academic only mode."
                                        aria-label="tt-public">
                                        <PublicSharpIcon fontSize={"large"} style={{color: "#4411A8"}}/>
                                    </Tooltip>
                                ) : (
                                    <Tooltip
                                        title="Post can view only academic users, click hear to make available for anyone who use the system."
                                        aria-label="tt-academic">
                                        <PeopleSharpIcon fontSize={"large"} style={{color: "#4411A8"}}/>
                                    </Tooltip>
                                )
                            }
                        </span>
                    </Grid>
                </Grid>

                <Typography variant="body1" component="body1" className={classes.postTitles}>
                    {stateDrafted !== 'none' ? (
                        <span className={classes.draftPost}>Draft/Not Published</span>
                    ) : (
                        <span
                            className={classes.publishedDate}>{"Published on: "}{postData.updatedAt.split("T")[0]}</span>
                    )}
                </Typography>


                <Grid container spacing={3} className={classes.bottomLine}>
                    <Grid item xs={2}><Typography><ThumbUpAltIcon/> &nbsp; {likeCount}</Typography></Grid>
                    <Grid item xs={2}><Typography><VisibilityIcon/> &nbsp; {viewCount}</Typography></Grid>
                    <Grid item xs={2}><Typography><ChatIcon/> &nbsp; {commentCount}</Typography></Grid>
                    <Grid item xs={2}><Button color="primary"
                                              className={classes.actionButton}
                                              onClick={makePublishOrUnpublish}>{statePublishUnpublish}</Button></Grid>
                    <Grid item xs={2}><Button color="secondary" className={classes.actionButton}
                                              onClick={handleClickOpen}>Delete</Button></Grid>
                    <Grid item xs={2}><PostVersion postID={postID} postType={postData.type} userID={userID}
                                                   postData={postData} banner={"text"}/></Grid>
                </Grid>
                {/*delete waring*/}
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure to delete this post permanently?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Once you delete the post, unable to recover back. If you want to temporally remove the post
                            form the system, use hiding option.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Do not delete
                        </Button>
                        <Button onClick={deleteFunction} color="primary" autoFocus>
                            Understood and delete the post
                        </Button>
                    </DialogActions>
                </Dialog>

            </Paper>
        </div>
    )
}
