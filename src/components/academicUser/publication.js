import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    postEntry: {
        padding: 15,
        borderRadius: 5,
        margin: 10,
        marginBottom: 25,
        width: "85%",
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

export default function Publication({postID, title, postData}) {
    let likeCount = 0;
    let dislikeCount = 0;
    let viewCount = postData.viewCount;
    let commentCount = 0;
    // get view,like comment counts
    postData.article.upvotes.map(data => likeCount++)
    postData.article.downvotes.map(data => dislikeCount++)
    postData.comments.map(data => commentCount++)

    let displayHiddenIcon = "none"
    if (postData.visibility === "Hidden")
        displayHiddenIcon = ""

    console.log(displayHiddenIcon)

    let [statePublishUnpublish, setStatePublishUnpublish] = useState("Unpublished");
    let [stateDrafted, setStateDrafted] = useState("none");
    let [statePublished, setStatePublished] = useState("none");

    useEffect(() => {
        if (postData.visibility === "hidden" || postData.article.status === "unpublished") {
            setStateDrafted("");
            setStatePublishUnpublish("Publish")
        } else {
            setStatePublished("");
            setStatePublishUnpublish("Unpublish")
        }
    }, [statePublishUnpublish])

    const classes = useStyles();

    // events
    const loadForEdit = (event) => {
        window.location.href = "/components/academicUser/writeArticle/" + postID;
    }
    const makePublishOrUnpublish = () => {
        let actionURL = "";
        if (statePublishUnpublish === "Unpublish") {
            // unpublish url
            actionURL = "http://localhost:9000/dashboard_operation/unpublish_post";
            setStatePublishUnpublish("Unpublished")
        } else {
            // publish url
            actionURL = "http://localhost:9000/dashboard_operation/republish_post";
            setStatePublishUnpublish("Published")
        }
        axios.post(actionURL, {"post_id": postID}).then(function (response) {
            console.log("action done");
            window.location.reload()
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
        const urlDeletePost = "http://localhost:9000/dashboard_operation/delete_post";
        axios.post(urlDeletePost, {"post_id": postID}).then(function (response) {
            console.log("post deleted");
            setOpen(false);
            window.location.reload();
        }).catch(function () {
            console.error("load failed");
        })

    }
    return (
        <div>
            <Paper className={classes.postEntry}>
                <Grid container spacing={3}>
                    <Grid item xs={11}>
                        <Typography variant="h5" component="h5" className={classes.postTitles}>
                            <Link href={'/components/academicUser/viewArticle/' + postID}>{title}</Link>
                        </Typography><br/>
                    </Grid>
                    <Grid item xs={1}>
                        <VisibilityOffIcon style={{display: displayHiddenIcon}}/>
                    </Grid>
                </Grid>

                <Typography variant="body1" component="body1" className={classes.postTitles}>Published on:
                    <span className={classes.publishedDate}
                          style={{display: statePublished}}>{postData.updatedAt.split("T")[0]}</span>
                    <span className={classes.draftPost} style={{display: stateDrafted}}>Draft/Not Published</span>
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
                    <Grid item xs={2}><Button color="primary" className={classes.actionButton}
                                              onClick={loadForEdit}>Edit</Button></Grid>
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
