import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Link, Paper, Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HistoryIcon from '@material-ui/icons/History';
import PostVersion from "./postVersion";

const useStyles = makeStyles((theme) => ({
    postEntry: {
        padding: 15,
        borderRadius: 5,
        margin: "auto",
        marginBottom: 25,
    },
    bottomLine: {
        padding: 10,
        paddingTop: 12,
        paddingBottom: 5,
    },
    actionButton: {
        fontWeight: "bold",
    },
    postTitles: {
        fontWeight: "bold",
        float: "left"
    },
    publishedDate: {
        marginLeft: 5,
    },
    draftPost: {
        fontWeight: "bold",
        backgroundColor: "#4411A8",
        color: "#fff",
        padding: 5,
        borderRadius: 5,
    }
}));

export default function PublicationVersion({postID, title, userID, postData}) {


    let [stateDrafted, setStateDrafted] = useState("none");

    useEffect(() => {
        if (postData.visibility === "hidden" || postData.article.status === "unpublished") {
            setStateDrafted("");
        }
    }, [])

    const classes = useStyles();


    return (
        <div>
            <Paper className={classes.postEntry}>
                <Grid container spacing={3}>
                    <Grid item xs={11} style={{textAlign: "left"}}>
                        <Typography variant="h5" component="h5" className={classes.postTitles}>
                            <Link href={'/components/academicUser/viewArticle/' + postID}
                                  style={{textDecoration: "none"}}>{title}</Link>
                        </Typography><br/>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip
                            title="This is a versioned article by you."
                            aria-label="tt-version">
                            <HistoryIcon fontSize={"large"} style={{color: "#4411A8"}}/>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.bottomLine}>
                    <Grid item xs={10} style={{textAlign: "left"}}>
                        <span className={classes.draftPost}>Versioned Article</span>
                        {stateDrafted !== 'none' ? (
                            <span className={classes.draftPost}>Draft/Not Published</span>
                        ) : (
                            <span/>
                        )}
                    </Grid>
                    <Grid item xs={2}><PostVersion postID={postID} userID={userID} postData={postData} banner={"text"}/></Grid>
                </Grid>
            </Paper>
        </div>
    )
}
