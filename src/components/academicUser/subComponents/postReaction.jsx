import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios';
import {Card, Snackbar, Tooltip} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import AddToLibrary from "./addToLibrary";
import PostPin from "./postPin";
import PostVersion from "./postVersion";
import APIURL from "../../API/APIURL";

export default function PostReaction({postType, userID, postID, postData, viewCount}) {

    let [stateButtonVisibility, setStateButtonVisibility] = useState(true);
    useEffect(() => {
        if (userID !== "")
            setStateButtonVisibility(false)
    }, [])
    // like,dislike,pin,add to library
    let [stateLike, setStateLike] = useState("#000");
    let [stateDislike, setStateDislike] = useState("#000");
    let [statePin, setStatePin] = useState("#000");
    let [stateAddToLibrary, setStateAddToLibrary] = useState("#000");

    // like dislike pin count
    let [stateLikeCount, setStateLikeCount] = useState(0);
    let [stateDislikeCount, setStateDislikeCount] = useState(0);

    useEffect(() => {
        postData.upvotes.map(data => {
            if (typeof data.by !== 'undefined')
                setStateLikeCount(++stateLikeCount)
        })
        postData.downvotes.map(data => {
            if (typeof data.by !== 'undefined')
                setStateDislikeCount(++stateDislikeCount)
        })
    }, []);

    // check already liked or disliked
    const urlCheckLikedDisliked = APIURL("vote_for_post/is_reacted");
    useEffect(() => {
        let data = {
            "user_ID": userID,
            "like_dislike": "like",
            "post_ID": postID
        };
        if (userID !== "")
            axios.post(urlCheckLikedDisliked, data).then(function (response) {
                if (response.data.is_upvoted) {
                    setStateLike("#935FF9")
                }
            }).catch(function () {
                console.error("load failed");
            })
    }, []);

    useEffect(() => {
        let data = {
            "user_ID": userID,
            "like_dislike": "dislike",
            "post_ID": postID
        };
        if (userID !== "")
            axios.post(urlCheckLikedDisliked, data).then(function (response) {
                if (response.data.is_downvoted) {
                    setStateDislike("#935FF9")
                }
            }).catch(function () {
                console.error("load failed");
            })
    }, [urlCheckLikedDisliked]);

    // Add to library
    const urlAvailability = APIURL("add_to_library/is_available_at_library");
    useEffect(() => {
        let data = {
            "post_ID": postID,
            "user_ID": userID,
        };
        if (userID !== "")
            axios.post(urlAvailability, data).then(function (response) {
                if (response.data.post_available)
                    setStateAddToLibrary("#935FF9")
            }).catch(function () {
                console.error("collection availability check failed");
            })
    }, [urlAvailability]);


    // toast message
    const [toastMessage, setToastMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    // events
    const thumpsUp = (event) => {
        const urlVote = APIURL("vote_for_post/");
        const data = {
            "user_ID": userID,
            "like_dislike": "like",
            "post_ID": postID
        };
        if (stateLike === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce dislike count if needed
                if (stateDislike === "#935FF9")
                    setStateDislikeCount(--stateDislikeCount);
                // color changing
                setStateLike("#935FF9");
                setStateDislike("#000");
                // like count increase
                setStateLikeCount(++stateLikeCount);
                setToastMessage("Thumps up recorded.")
                setOpen(true);
            }).catch(function () {
                console.log("Thumps up not recorded.");
            })
    };

    const thumpsDown = (event) => {
        const urlVote = APIURL("vote_for_post/");
        const data = {
            "user_ID": userID,
            "like_dislike": "dislike",
            "post_ID": postID
        };
        if (stateDislike === "#000")
            axios.post(urlVote, data).then(function (response) {
                // reduce like count if needed
                if (stateLike === "#935FF9")
                    setStateLikeCount(--stateLikeCount);
                // color changing
                setStateLike("#000");
                setStateDislike("#935FF9");
                // increase dislike count
                setStateDislikeCount(++stateDislikeCount);
                setToastMessage("Thumps down recorded.")
                setOpen(true);
            }).catch(function () {
                console.log("Thumps down not recorded.");
            })
    };

    const downloadPost = () => {
        if (postType === "document") {
            window.open(postData.current.content, '_blank');
        } else {
            // create pdf using post
            let myWindow = window.open('', 'PRINT', 'height=400,width=600');

            myWindow.document.write('<html><head><title>Print article</title>');
            myWindow.document.write('</head><body >');
            myWindow.document.write(document.getElementById("printable-article").innerHTML);
            myWindow.document.write('</body></html>');

            myWindow.document.close();
            myWindow.focus();

            myWindow.print();
            // myWindow.close();
        }
    }

    const manageExternalShare = () => {
        navigator.clipboard.writeText(window.location.href);
        //TODO display toast
        setToastMessage("Post link copy to clipboard.")
        setOpen(true);
    }

    return (
        <Card>
            <Grid container spacing={3} style={{paddingTop: 10, paddingBottom: 10, textAlign: "center"}}>
                <Grid item xs={4}>
                    <Button onClick={thumpsUp} disabled={stateButtonVisibility}>
                        <ThumbUpIcon fontSize={"large"} style={{color: stateLike}}/>
                    </Button>
                    <br/><span>{stateLikeCount} Up-votes</span>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={thumpsDown} disabled={stateButtonVisibility}>
                        <ThumbDownIcon fontSize={"large"} style={{color: stateDislike}}/>
                    </Button>
                    <br/><span>{stateDislikeCount} Down-votes</span>

                </Grid>
                <Grid item xs={4}>
                    <Button>
                        <VisibilityIcon fontSize={"large"}/>
                    </Button>
                    <br/><span>{viewCount} Views</span>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title="Share outside">
                        <Button onClick={manageExternalShare}>
                            <ShareIcon fontSize={"large"}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title="Download content">
                        <Button onClick={downloadPost}>
                            <CloudDownloadIcon fontSize={"large"}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title="Add to library">
                        <AddToLibrary postID={postID} userID={userID}/>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={4}>
                    <PostPin userID={userID} postID={postID}/>
                </Grid>
                <Grid item xs={4}>
                    <PostVersion postID={postID} userID={userID} postData={postData} banner={"icon"}/>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Card>
    )
}
