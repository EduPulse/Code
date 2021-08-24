import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';
import {Card, Tooltip} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PinDropIcon from '@material-ui/icons/PinDrop';
import UpdateIcon from '@material-ui/icons/Update';

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
        postData.upvotes.map(data => setStateLikeCount(++stateLikeCount))
        postData.downvotes.map(data => setStateDislikeCount(++stateDislikeCount))
    }, []);

    // check already liked or disliked
    const urlCheckLikedDisliked = "http://localhost:9000/vote_for_post/is_reacted";
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
    const urlAvailability = "http://localhost:9000/add_to_library/is_available_at_library";
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


    // events
    const thumpsUp = (event) => {
        const urlVote = "http://localhost:9000/vote_for_post/";
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
                console.log("Thumps up recorded.");
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
                console.log("Thumps down recorded.");
            }).catch(function () {
                console.log("Thumps down not recorded.");
            })
    };

    const pinPost = (event) => {

    }

    const downloadPost = () => {
        if (postType === "document") {
            window.open(postData.current.content, '_blank');
        } else {
            // create pdf using post
            // window.print()
            // let doc = new jsPDF("landscape", 'px', 'A4');
            // doc.html(document.getElementById("printable-article"), {
            //     callback: () => {
            //         doc.save('test.pdf');
            //     }
            // });
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
                        <Button disabled={stateButtonVisibility}>
                            <BookmarkIcon fontSize={"large"} style={{color: stateAddToLibrary}}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={4}>
                    <Tooltip title="Pin the post">
                        <Button onClick={pinPost} disabled={stateButtonVisibility}>
                            <PinDropIcon fontSize={"large"}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title="Version the content">
                        <Button>
                            <UpdateIcon fontSize={"large"}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        </Card>
    )
}
