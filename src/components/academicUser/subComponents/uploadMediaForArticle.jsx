import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress, Snackbar} from "@material-ui/core";
import axios from "axios";
import APIURL from "../../API/APIURL";
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from "material-ui-dropzone";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
    input: {
        display: 'none',
    },
});

export default function UploadMediaForArticle({userID}) {
    const classes = useStyles();

    const [showProgress, setShowProgress] = React.useState(false);

    // toast message
    const [toastMessage, setToastMessage] = React.useState("");
    const [openToast, setOpenToast] = React.useState(false);
    const handleClose = () => {
        setOpenToast(false);
    }

    const handleFileUpload = ([file]) => {
        setOpen(false)
        setShowProgress(true)
        console.log(file)

        const formData = new FormData();
        formData.append("media", file, file.name);

        axios({
            method: "post",
            url: APIURL("write_article/upload_media_for_article"),
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        })
            .then(function (response) {
                setToastMessage("Image link copy to the clipboard. Past it on editor wherever you prefer.")
                setShowProgress(false)
                setOpenToast(true)
                // TODO config change
                const resourceURL = "https://res.cloudinary.com/edupulse/image/upload/v1631097533/" + response.data.public_id;
                const finalText = "$EduPulseEmbedImage$" + resourceURL + "$EduPulseEmbedImage$";
                navigator.clipboard.writeText(finalText.toString());
                console.log(finalText);
            })
            .catch(function (err) {
                setToastMessage("Upload resource failed. Try again.")
                console.log(err);
            });
    }
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <div>
                <DropzoneDialog
                    acceptedFiles={['image/*']}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={5000000}
                    open={open}
                    filesLimit={1}
                    onClose={() => setOpen(false)}
                    onSave={handleFileUpload}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                    showAlerts={false}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span" onClick={() => setOpen(true)}>
                        Upload Image
                        {showProgress ? (
                            <span>&nbsp;<CircularProgress size={25}/></span>
                        ) : (<span/>)}
                    </Button>

                </label>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openToast}
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
        </div>
    );
}
