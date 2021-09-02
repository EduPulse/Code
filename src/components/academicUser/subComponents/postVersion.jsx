import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import APIURL from "../../API/APIURL";

export default function PostVersion({userID, postID, postData}) {

    let [stateButtonVisibility, setStateButtonVisibility] = useState("#000");
    // check versioning feasibility
    useEffect(() => {
        // TODO user role checkup need to add
        if (postData.license.search("nd") !== -1 || userID === "") {
            setStateButtonVisibility("rgba(77,75,75,0.61)")
        }
    }, [])

    // alert box function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (postData.license.search("nd") === -1 && userID !== "")
            setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // events
    const initiateVersioning = (event) => {
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

    return (
        <div>
            <Tooltip title="Version the content">
                <Button onClick={handleClickOpen} style={{color: stateButtonVisibility}}>
                    <UpdateIcon fontSize={"large"}/>
                </Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Post Versioning</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This option allows you to create a new version based on the existing version. After doing this,
                        your version becomes the major content version. Because of that, make sure not to perform any
                        unethical action. That may course to suspend your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={initiateVersioning} color="primary" autoFocus>
                        Understood and go for versioning
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
