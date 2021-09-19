import React from 'react';
import {Snackbar as MUISnackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export default function Snackbar(props) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.close();
    };

    return (
        <MUISnackbar open={props.open} autoHideDuration={5000} onClose={handleClose}
                     anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}>
            <Alert onClose={handleClose} severity={props.type}>
                {props.message}
            </Alert>
        </MUISnackbar>
    );
}