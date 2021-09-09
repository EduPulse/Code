import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';

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
        paddingLeft: '5px',
        paddingRight: '40px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '250px',
        height: '400px'
    },
    logo: {
        width: '70px',
        height: '70px',
        borderRadius: '6px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
    },
    usericon: {
        width: '130px',
        height: '130px',
        display: 'block',
        margin: '20px auto',
    },
    authicons: {
        display: 'block',
        marginLeft: '17.5px',
        marginRight: 'auto',
        marginTop: '40px'
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
                    title={author}
                    subheader={readTime}
                />

                <CardMedia
                    className={classes.media}
                    image={coverImg}
                    title="Cover Image"
                />

                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {title}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    );
}