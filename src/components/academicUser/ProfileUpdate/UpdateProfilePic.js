import React, {useState} from 'react'
import {Button, Grid, makeStyles,} from '@material-ui/core';
import axios from 'axios';
import {DropzoneArea} from 'material-ui-dropzone'
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'block',
    },

    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
    },

    avatar: {
        backgroundColor: '#935FF9',
    },

    buttonStyleMain: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '20px',
        width: '180px'
    },
    buttonStyleSub: {
        backgroundColor: '#d81b60',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#880E4F',
        },
        marginBottom: '20px',
        width: '180px'
    },
}));

function UpdateProfilePic({userID, userProfilePic}) {
    const classes = useStyles();
    
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <DropzoneArea
                        // onChange={handlefileChange}
                        acceptedFiles={['image/jpeg', 'image/png']}
                        maxFileSize={50000000}
                        filesLimit={1}
                        showFileNamesInPreview={true}
                        filename="media"
                    />

                    <Grid item>
                        <Button
                            aria-label="recipe"
                            className={classes.buttonStyleMain}
                            type="submit"
                            // onClick={handleSubmit}
                        >
                            Upload New Photo
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            aria-label="recipe"
                            className={classes.buttonStyleSub}
                            // onClick={removePhoto}
                        >
                            Remove Photo
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default UpdateProfilePic
