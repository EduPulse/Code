import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '15px',
        marginBottom: '20px'
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function PublisherCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }

                title="Navenn Perera"
                subheader="Enthusiastic on coding"
            />

        </Card>
    );
}

export default PublisherCard