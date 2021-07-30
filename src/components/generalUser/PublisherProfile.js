import React from 'react'
import ReactDOM from 'react-dom';
import Posts from '../posts';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileInfo from './profileInfo';
import PublicationInfo from './publicationInfo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
        backgroundColor: '#DFDAE8',
    },
    profileInfo: {
        marginTop: '90px',
        marginBottom: '20px',
        width: '100%'
    },
    pubPostInfo: {
        width: '100%'
    },
    postsInfo: {
        width: '100%',
    },
}));

function UserProfile() {
    const classes = useStyles();

    return (
        <div>
            <div align="center">
                <div className={classes.root}>
                    <Grid container spacing={3} className={classes.profileInfo}>
                        <Grid item xs>
                            <ProfileInfo />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.pubPostInfo}>
                        <Grid item xs className={classes.postsInfo}>
                            <PublicationInfo />
                        </Grid>
                        <Grid item xs={8} className={classes.postsInfo}>
                            <Posts />
                            <Posts />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
