import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PinDropIcon from "@material-ui/icons/PinDrop";

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
        float: "right"
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

export default function PublicationPin({originalPostID, postID, title, postData}) {
    let likeCount = 0;
    let dislikeCount = 0;
    let viewCount = postData.viewCount;
    let commentCount = 0;
    // // get view,like comment counts
    // postData.article.upvotes.map(data => likeCount++)
    // postData.article.downvotes.map(data => dislikeCount++)
    // postData.comments.map(data => commentCount++)


    let [statePublished, setStatePublished] = useState("none");


    const classes = useStyles();

    // events
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
                            <Link href={'/components/academicUser/viewArticle/' + originalPostID}>{title}</Link>
                        </Typography><br/>
                    </Grid>
                    <Grid item xs={1}>
                        <PinDropIcon fontSize={"large"} style={{color: "#4411A8"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.bottomLine}>
                    <Grid item xs={9}>
                        <Typography variant="body1" component="body1" className={classes.postTitles}>
                            <span className={classes.draftPost}>Post Pin</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}><Button color="secondary" className={classes.actionButton}
                                              onClick={handleClickOpen}>Remove Pin</Button></Grid>
                </Grid>
                {/*delete waring*/}
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure to remove pin?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Once you delete the post, unable to recover back. If you want to temporally remove the post
                            form the system, use hiding option.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Do not remove pin
                        </Button>
                        <Button onClick={deleteFunction} color="primary" autoFocus>
                            Understood and remove the post
                        </Button>
                    </DialogActions>
                </Dialog>

            </Paper>
        </div>
    )
}
