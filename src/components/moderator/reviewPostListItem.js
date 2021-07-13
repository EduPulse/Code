import React from 'react'
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:20,
        margin:"auto",
        marginTop:7,
    },
    contentUnit:{
        textAlign:"center",
        display:"block",
    }
}));
export default function ReviewPostListItem({postID,type,creator,reportCount}) {

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" component="body1" className={classes.contentUnit}>
                            Post ID: <br/> <b>{postID}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" component="body1" className={classes.contentUnit}>
                            Post Type: <br/> <b>{type}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" component="body1" className={classes.contentUnit}>
                            Creator’s ID: <br/> <b>{creator}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" component="body1" className={classes.contentUnit}>
                            No. of Reports: <br/> <b>{reportCount}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop:10,margin:"auto",display:"block"}}>
                            <Button variant="contained" style={{backgroundColor:"#4411A8",color:"#fff",margin:"auto"}}>Review</Button>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Card>
        </div>
    )
}
