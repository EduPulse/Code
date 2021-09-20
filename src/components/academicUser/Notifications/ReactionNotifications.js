import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import SingleReaction from './SingleReaction'

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

function ReactionNotifications({reactionArray}) {

    const classes = useStyles();

    const reactionSet = reactionArray.map( reaction => {
        if (reactionArray.length == 0) {
            return (
                <Card className={classes.root}>
                    <CardHeader
                        title="You have no new reactions on your posts"
                    />
                </Card>
            )
        } else {
            return (
                <SingleReaction 
                    description = {reaction.description}
                />
            )
        }
    })

    return (
        <div>
            { reactionSet }
        </div>
    )
}

export default ReactionNotifications