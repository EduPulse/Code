import React from 'react'
import Posts from './../posts';
import {Grid, makeStyles} from '@material-ui/core';
import NotificationButtons from './NotificationButtons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '190px',
        width: '80%',
        marginBottom: '30px',
        marginLeft: '130px',
        borderRadius: '10px'
    },
    pubPostInfo: {
        width: '80%',
        marginTop: '100px',
    },
    postsInfo: {
        width: '100%',
        //   marginTop:'100px',
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginLeft: '50px'
    },
    typography: {
        color: 'black'
    }
}));

function Publications() {
    const classes = useStyles();

    return (
        <div>
            <div className={useStyles.root} align="center">
                <Grid container spacing={3} className={classes.pubPostInfo}>
                    <Grid item xs className={classes.postsInfo}>
                        <NotificationButtons/>
                    </Grid>
                    <Grid item xs={8} className={classes.postsInfo}>
                        <Posts/>
                        <Posts/>
                        <Posts/>
                        <Posts/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Publications