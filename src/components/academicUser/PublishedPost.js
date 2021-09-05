import React from 'react'
import AcaNavbar from './acaNavbar'
import {Grid, makeStyles,} from '@material-ui/core';
import Post from './Post';
import PublisherCard from './PublisherCard'
import MoreFromPublisher from './MoreFromPublisher'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    postsInfo: {
        width: '600px',
        marginTop: '100px',
        marginLeft: '200px',
        marginBottom: '50px'
    },
    publisherInfo: {
        marginTop: '100px',
        marginLeft: '50px',
        width: '350px'
    }
}));

function PublishedPost() {
    const classes = useStyles();

    return (
        <div>
            <AcaNavbar/>

            <div className={useStyles.root} align="center">
                <Grid container className={classes.pubPostInfo}>
                    <Grid item className={classes.postsInfo}>
                        <Post/>
                    </Grid>
                    <Grid item className={classes.publisherInfo}>
                        <PublisherCard/>
                        <MoreFromPublisher/>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default PublishedPost
