import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

import {Avatar, Card, CardContent, CardHeader, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '15px',
        marginBottom: '20px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    likes: {
        paddingLeft: '10px'
    },
    subcard: {
        borderStyle: 'solid',
        borderColor: '#a3a3c2',
    },
    iconStyles: {
        marginLeft: '20px',
        marginRight: '20px'
    }
}));

function Comments() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }

                title="Artem commented on your post on Java Programming"
                subheader="2 hours before"
            />
            <CardContent>
                <Card>
                    <CardContent className={classes.subcard}>
                        <Typography>Why did you used version 8.0?</Typography>
                        <IconButton>
                            <ThumbUpIcon className={classes.iconStyles}/>
                            <Typography>Like</Typography>

                            <VisibilityOutlinedIcon className={classes.iconStyles}/>
                            <Typography>View</Typography>

                            <CommentOutlinedIcon className={classes.iconStyles}/>
                            <Typography>Reply</Typography>
                        </IconButton>

                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

export default Comments