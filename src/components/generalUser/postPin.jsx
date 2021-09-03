import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import APIURL from "../API/APIURL";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Tooltip
} from "@material-ui/core";
import PinDropIcon from '@material-ui/icons/PinDrop';

export default function PostPin({userID, postID}) {

    let [stateButtonVisibility, setStateButtonVisibility] = useState(true);
    let [statePinMessage, setStatePinMessage] = useState("");
    let [stateDoPin, setStateDoPin] = useState("#000");

    useEffect(() => {
        let urlCheckAlreadyPin = APIURL("pin_post/is_already_pin")
        let data = {
            "user_ID": userID,
            "post_ID": postID
        };
        if (userID !== "")
            axios.post(urlCheckAlreadyPin, data).then(function (response) {
                console.log(response.data)
                if (response.data.post_already_pin) {
                    setStateDoPin("#935FF9")
                }
            }).catch(function () {
                console.error("load failed");
            })
    }, []);

    useEffect(() => {
        if (userID !== "")
            setStateButtonVisibility(false)
    }, [])


    // alert box function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (stateDoPin === "#000")
            setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // events
    const pinPost = (event) => {
        const urlPin = APIURL("pin_post/make_post_pin");
        const data = {
            post_ID: postID,
            user_ID: userID,
            pin_message: statePinMessage
        };
        if (stateDoPin === "#000")
            axios.post(urlPin, data).then(function (response) {
                // color changing
                setStateDoPin("#935FF9");
                console.log("post pinned.")
                setOpen(true);
                handleClose();
            }).catch(function () {
                console.log("not pinned.");
            })
    }

    return (
        <div>
            <Tooltip title="Pin the post">
                <Button disabled={stateButtonVisibility} onClick={handleClickOpen}>
                    <PinDropIcon fontSize={"large"} style={{color: stateDoPin}}/>
                </Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Post pin</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This option let you to pin other post on your timeline.
                    </DialogContentText>
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Pin Message"
                        type="text"
                        fullWidth
                        onChange={(event) => setStatePinMessage(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={pinPost} color="primary" autoFocus>
                        Pin to me
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
