import React, { useState } from 'react'
import { makeStyles, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Collapse } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
      marginBottom: '20px'
    },
    avatar: {
      backgroundColor: '#935FF9',
      marginLeft: '120px',
      alignContent: 'center',
    },
    authorName: {
        fontSize: '24px',
        textAlign: 'center'
    },
  }));

function Followers({ userID, followers }) {
    const classes = useStyles();

     const myfollowers = followers.map((follower) => 
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={follower.profilePicture} />
                }
            />
            <CardContent>
                <Typography className={classes.authorName} >{follower.name}</Typography>
                <Typography className={classes.authorBio} >{follower.bio}</Typography>
            </CardContent>
        </Card>
    );

    return (
        <div>
            { myfollowers }
        </div>
    )
}

export default Followers
