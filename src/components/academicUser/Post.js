import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        marginBottom: '20px',
        maxWidth: '550px',
        // height: '400px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10
    },
    avatar: {
        backgroundColor: '#935FF9',
        width: '70px',
        height: '70px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    titleStyle: {
        fontSize: '24px',
        textAlign: 'left'
    },
    readTimeStyle: {
        fontSize: '14px',
        marginBottom: '0px'
    },
    authorStyle: {
        fontSize: '18px',
        display: 'inline'
    }
}));


export default function Post({author, profilePic, title, coverImg, readTime,}) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe" className={classes.avatar}
                            alt="Profile image"
                            src={profilePic}
                        />
                    }
                    title={
                        <p className={classes.authorStyle}>Written by {author}</p>
                    }
                    subheader={
                        <p className={classes.readTimeStyle}> {readTime} minutes read</p>
                    }
                />

                <CardMedia
                    className={classes.media}
                    image={coverImg}
                    title="Cover Image"
                />

                <CardContent>
                    <p className={classes.titleStyle}>{title}</p>
                </CardContent>
            </Card>
        </div>
    );
}