import React from "react";
import {alpha, makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";
import VideocamSharpIcon from "@material-ui/icons/VideocamSharp";
import AudiotrackSharpIcon from "@material-ui/icons/AudiotrackSharp";
import PictureAsPdfSharpIcon from "@material-ui/icons/PictureAsPdfSharp";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        width: 800,
        height: 586,
        backgroundColor: "#4411A8",
        margin: "auto",
    },
    actionSection: {
        bottom: 0,
        width: 800,
        height: 474,
        flexGrow: 1,
    },
    title: {
        textAlign: "center",
        color: "#fff",
        marginBottom: 20,
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    uploadFile: {
        margin: 10,
        height: 405,
        width: 368,
        marginTop: 30,
        borderStyle: "dashed",
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#935FF9",
        '&:hover': {
            backgroundColor: alpha("#935FF9", 0.70),
            color: "#fff",
        },
        color: "#935FF9",
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    writePost: {
        margin: 10,
        height: 405,
        width: 368,
        marginTop: 30,
        color: "#fff",
        alignItems: "center",
        fontSize: 25,
        justifyContent: "center",
        backgroundColor: "#935FF9",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#935FF9",
            border: "1px solid #935FF9",
        },
    },
    input: {
        display: "none",
    },
    closeButton: {
        textAlign: "right",
        fontSize: 25,
        color: "#fff",
    },
}));

export default function MediaControlCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                {/* header section */}
                <CardContent className={classes.content}>
                    {/* close button */}
                    <Link to="/" style={{fontWeight: 600, textDecoration: "none"}}>
                        <Typography className={classes.closeButton}>
                            <Button className={classes.closeButton}>
                                <CloseSharpIcon/>
                            </Button>
                        </Typography>
                    </Link>
                    {/* create post text */}
                    <Typography className={classes.title} component="h4" variant="h4">
                        Create Post
                    </Typography>
                </CardContent>

                <Card className={classes.actionSection}>
                    <Grid container spacing={3}>
                        {/* write article section */}
                        <Grid item xs={6}>
                            <Link to={"/components/academicUser/writeArticle"} style={{textDecoration: "none"}}>
                                <Button className={classes.writePost}>
                                    <Typography component="h5" variant="h5">
                                        <CreateSharpIcon/>
                                        &nbsp; Write an article
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>

                        {/* upload file section */}
                        <Grid item xs={6}>
                            <input
                                accept="*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    className={classes.uploadFile}
                                    variant="contained"
                                    component="span"
                                >
                                    <Typography component="h5" variant="h5">
                                        <VideocamSharpIcon/>
                                        &nbsp;
                                        <AudiotrackSharpIcon/>
                                        &nbsp;
                                        <PictureAsPdfSharpIcon/>
                                        <br/>
                                        Drag & Drop
                                        <br/>
                                        or
                                        <br/>
                                        Click here to browse
                                        <br/>
                                        the file
                                    </Typography>
                                </Button>
                            </label>
                        </Grid>

                    </Grid>
                </Card>
            </div>
        </Card>
    );
}
