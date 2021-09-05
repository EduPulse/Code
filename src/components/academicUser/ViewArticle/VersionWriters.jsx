import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VersionWriterEntry from "../subComponents/versionWriterEntry";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // width: "80%",
        borderRadius: 6,
    },
}));

export default function VersionWriters({versionData, postID}) {
    console.log(versionData)
    const classes = useStyles();

    let authorID = 1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h5" color="primary" component="h5" style={{fontWeight: 600}}>
                    Version History
                </Typography>

                {
                    versionData.map(data =>
                        <VersionWriterEntry postID={postID} userID={data.contributor} authorIndex={authorID++}/>
                    )
                }

            </Paper>
        </div>
    );
}
