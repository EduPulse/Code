import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import SinglePostNotification from './SinglePostNotification';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        marginBottom: '10px',
        background: '#E1D4FC',
    },
    avatar: {
        backgroundColor: '#935FF9',
    },
}));

function PostNotifications({postArray}) {

    const classes = useStyles();

    const postsSet = postArray.map(post => {
        if (postArray.length == 0) {
            return (
                <Card className={classes.root}>
                    <CardHeader
                        title="You have no new publication notifications"
                    />
                </Card>
            )
        } else {
            return (
                <SinglePostNotification
                    description={post.description}
                />
            )
        }
    })

    return (
        <div>
            {postsSet}
        </div>
    )
}

export default PostNotifications