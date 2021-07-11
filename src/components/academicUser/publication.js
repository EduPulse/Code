import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Link, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    postEntry: {
        padding: 15,
        borderRadius: 5,
        margin: 10,
        marginBottom: 25,
        width: "85%",
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
    },
    publishedDate: {
        marginLeft: 5,
    },
    draftPost: {
        backgroundColor: "#4411A8",
        color: "#fff",
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
    }
}));

export default function Publication({title,isDraft,publishedDate, likeCount,viewCount,commentCount}) {
    let drafted = "none";
    let published = "none";
    if (isDraft) {
        drafted = "";
    } else {
        published = "";
    }
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.postEntry}>
                <Typography variant="h5" component="h5" className={classes.postTitles}>
                    <Link to={'/users/post'}>{title}</Link>
                </Typography><br/>
                <Typography variant="body1" component="body1" className={classes.postTitles}>Published on:
                    <span className={classes.publishedDate} style={{display: published}}>{publishedDate}</span>
                    <span className={classes.draftPost} style={{display: drafted}}>Draft</span>
                </Typography>
                <Grid container spacing={3} className={classes.bottomLine}>
                    <Grid item xs={2}><Typography><ThumbUpAltIcon/> &nbsp; {likeCount}</Typography></Grid>
                    <Grid item xs={2}><Typography><VisibilityIcon/> &nbsp; {viewCount}</Typography></Grid>
                    <Grid item xs={2}><Typography><ChatIcon/> &nbsp; {commentCount}</Typography></Grid>
                    <Grid item xs={2}><Button color="primary" className={classes.actionButton}>Stats</Button></Grid>
                    <Grid item xs={2}><Button color="secondary" className={classes.actionButton}>Delete</Button></Grid>
                    <Grid item xs={2}><Button color="primary" className={classes.actionButton}>Edit</Button></Grid>
                </Grid>
            </Paper>
        </div>
    )
}
