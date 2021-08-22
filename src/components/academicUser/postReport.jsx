import React, {useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export default function PostReport({userID, postID}) {
    // state variable to store report details
    let [stateReportTitle, setStateReportTitle] = useState("");
    let [stateReportMessage, setStateReportMessage] = useState("");
    let [stateReportType, setStateReportType] = useState("");


    // check already liked or disliked
    // const urlCheckLikedDisliked = "http://localhost:9000/vote_for_post/is_reacted";
    //
    // useEffect(() => {
    //     let data = {
    //         "user_ID": userID,
    //         "like_dislike": "like",
    //         "post_ID": postID
    //     };
    //     axios.post(urlCheckLikedDisliked, data).then(function (response) {
    //         if (response.data.is_upvoted) {
    //             setStateLike("#935FF9")
    //         }
    //     }).catch(function () {
    //         console.error("load failed");
    //     })
    // }, []);
    //
    // useEffect(() => {
    //     let data = {
    //         "user_ID": userID,
    //         "like_dislike": "dislike",
    //         "post_ID": postID
    //     };
    //     axios.post(urlCheckLikedDisliked, data).then(function (response) {
    //         if (response.data.is_downvoted) {
    //             setStateDislike("#935FF9")
    //         }
    //     }).catch(function () {
    //         console.error("load failed");
    //     })
    // }, [urlCheckLikedDisliked]);
    //
    // // Add to library
    // const urlAvailability = "http://localhost:9000/add_to_library/is_available_at_library";
    // useEffect(() => {
    //     let data = {
    //         "post_ID": postID,
    //         "user_ID": userID,
    //     };
    //     axios.post(urlAvailability, data).then(function (response) {
    //         if (response.data.post_available)
    //             setStateAddToLibrary("#935FF9")
    //     }).catch(function () {
    //         console.error("collection availability check failed");
    //     })
    // }, [urlAvailability]);
    //
    // // events
    // const thumpsUp = (event) => {
    //     const urlVote = "http://localhost:9000/vote_for_post/";
    //     const data = {
    //         "user_ID": userID,
    //         "like_dislike": "like",
    //         "post_ID": postID
    //     };
    //     if (stateLike === "#000")
    //         axios.post(urlVote, data).then(function (response) {
    //             // reduce dislike count if needed
    //             if (stateDislike === "#935FF9")
    //                 dislikeCount--;
    //             // color changing
    //             setStateLike("#935FF9");
    //             setStateDislike("#000");
    //             // like count increase
    //             likeCount++;
    //             console.log("Thumps up recorded.");
    //         }).catch(function () {
    //             console.log("Thumps up not recorded.");
    //         })
    // };
    //
    // const thumpsDown = (event) => {
    //     const urlVote = "http://localhost:9000/vote_for_post/";
    //     const data = {
    //         "user_ID": userID,
    //         "like_dislike": "dislike",
    //         "post_ID": postID
    //     };
    //     if (stateDislike === "#000")
    //         axios.post(urlVote, data).then(function (response) {
    //             // reduce like count if needed
    //             if (stateLike === "#935FF9")
    //                 likeCount--;
    //             // color changing
    //             setStateLike("#000");
    //             setStateDislike("#935FF9");
    //             // increase dislike count
    //             dislikeCount++;
    //             console.log("Thumps down recorded.");
    //         }).catch(function () {
    //             console.log("Thumps down not recorded.");
    //         })
    // };

    // events
    const [open, setOpen] = React.useState(false);
    let [stateWarningStyle, setStateWarningStyle] = useState("1px solid black");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setStateWarningStyle("1px solid black")
        setOpen(false);
    };

    const handleReportSubmit = () => {
        if (stateReportTitle !== "" && stateReportMessage !== "" && stateReportType !== "") {
            console.log(stateReportMessage, stateReportTitle, stateReportType)
            handleClose();
        } else {
            //display error
            setStateWarningStyle("4px solid red")
            // handleClose();
        }
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Report Abuse
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report Article/Post/Comments</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you think this post/article/comment is not suitable to be in this system, you can report it
                        to the
                        system management. You can put only one report for any given post/article/comment.
                    </DialogContentText>

                    <FormControl style={{minWidth: "100%"}}>
                        Type of the Report:
                        <Select
                            id="demo-customized-select-q2"
                            onChange={(event) => setStateReportType(event.target.value)}
                            style={{borderBottom: stateWarningStyle}}
                            fullWidth
                            required
                        >
                            <MenuItem value={"spam"} defaultChecked={true}>Spam</MenuItem>
                            <MenuItem value={"harassment"}>Harassment</MenuItem>
                            <MenuItem value={"content ownership"}>Content Ownership</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                    </FormControl><br/><br/>
                    Title:
                    <TextField
                        // autoFocus
                        margin="dense"
                        style={{borderBottom: stateWarningStyle}}
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        onChange={(event) => setStateReportTitle(event.target.value)}
                    /><br/><br/>
                    Message:
                    <TextField
                        multiline
                        style={{borderBottom: stateWarningStyle}}
                        rows={5}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message"
                        fullWidth
                        required
                        onChange={(event) => setStateReportMessage(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReportSubmit} color="primary">
                        Submit Report
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
