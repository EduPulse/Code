import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Comments from './Comments.js'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        marginBottom: '10px',
        background:  '#E1D4FC',
    },
    avatar: {
        backgroundColor: '#935FF9',
    },
}));

function CommentNotifications({ commentArray }) {
    
    const classes = useStyles();

    console.log("reactions length: ", commentArray.length);

    const commentSet = commentArray.map( comment => {
        if (commentArray.length == 0) {
            return (
                <Card className={classes.root}>
                    <CardHeader
                        title="You have no new comments on your posts"
                    />
                </Card>
            )
        } else {
            return (
                <Comments 
                    description = {comment.description}
                />
            )
        }
    })

    return (
        <div>
            { commentSet }
        </div>
    )
}

export default CommentNotifications