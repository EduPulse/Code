import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import APIURL from "../../API/APIURL";


export default function PostReport({userID, postID}) {
    // state variable to store report details
    let [stateReportTitle, setStateReportTitle] = useState("");
    let [stateReportMessage, setStateReportMessage] = useState("");
    let [stateReportType, setStateReportType] = useState("");

    let [buttonState, setButtonState] = useState(false);
    useEffect(() => {
        if (userID === "")
            setButtonState(true)
    }, [])

    // check already liked or disliked
    const urlCheckAlreadyReport = APIURL("report_operation/check_post_already_reported");
    useEffect(() => {
        let data = {
            "post_ID": postID,
            "user_ID": userID
        };
        axios.post(urlCheckAlreadyReport, data).then(function (response) {
            if (response.data.report_available) {
                setButtonState(true)
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    //events
    const makeReport = (event) => {
        // TODO change url for reporting
        const urlCreateReport = APIURL("reports");
        let data = {
            "reportedBy": userID,
            "type": "post",
            "category": stateReportType,
            "title": stateReportTitle,
            "message": stateReportMessage,
            against: {post: postID}
        };
        axios.post(urlCreateReport, data).then(function (response) {
            if (response) {
                console.log("report create.");
            } else {
                console.log("report not placed.");
            }
        }).catch(function () {
            console.error("something went wrong.");
        })
    };

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
            makeReport();
            handleClose();
        } else {
            //display error
            setStateWarningStyle("4px solid red")
            // handleClose();
        }
    }

    return (
        <div>
            <Button onClick={handleClickOpen} disabled={buttonState}>
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
