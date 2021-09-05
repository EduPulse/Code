import React from 'react'
import {red} from '@material-ui/core/colors';
import {Card, CardContent, CardHeader, makeStyles, Typography,} from '@material-ui/core';

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
        marginBottom: '20px',
    },
    iconStyles: {
        marginLeft: '20px',
        marginRight: '20px'
    }
}));

function MoreFromPublisher() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader

                title="More from Naveen"
            />
            <CardContent>
                <Card>
                    <CardContent className={classes.subcard}>
                        <Typography>Programming fundementals of Java</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className={classes.subcard}>
                        <Typography>Tips for beginners in coding</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className={classes.subcard}>
                        <Typography>Why you should learn Java</Typography>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

export default MoreFromPublisher
