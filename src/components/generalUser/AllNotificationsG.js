import React from 'react'
import CommentNotifications from './commentNotificationsG'
import NotificationsAllInOne from './notificationsAllInOneG'
import PostNotifications from './postNotificationsG'
import ReactionNotifications from './reactionNotificationsG'

import { Grid, makeStyles, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:'190px',
      width: '80%',
      marginBottom: '30px',
      marginLeft: '130px',
      borderRadius: '10px'
    },

    pubPostInfo: {
        width: '80%',
        marginTop:'100px',
    },
    
    postsInfo:{
      width:'100%',
    //   marginTop:'100px',
    },
    avatar: {
        backgroundColor:'#935FF9',
        marginLeft: '50px'
    },
    typography: {
        color: 'black'
    }
}));

function AllNotifications () {
    const classes = useStyles();

    return (
        <div>
            <div className={useStyles.root} align="center">
                <Grid container spacing={3} className={classes.pubPostInfo} justifyContent="center">
                    <Grid item xs={8} className={classes.postsInfo}>
                        <NotificationsAllInOne/>
                        <PostNotifications/>
                        <CommentNotifications/>
                        <ReactionNotifications/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AllNotifications
