import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 340,
        borderRadius: 5,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    authorInfo: {
        fontSize: 18,
        fontWeight: 550,
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
    summaryValues: {
        textAlign: "center",
    },
    title: {
        textAlign: "center",
        fontWeight: 600,
    },
    profilePic: {
        width: 50,
        height: 50,
        margin: "auto",

    },
}));

export default function PostListing({title, coverImage, author, authorPP, publishedData}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt="Profile image" className={classes.profilePic} src={authorPP}/>
                }
                title={
                    <span className={classes.authorInfo}>
                        <Link to={'/users'} style={{fontWeight: 600}}>{author}</Link>
                    </span>
                }
                subheader={publishedData}
            />
            <CardMedia
                className={classes.media}
                image={coverImage}
            />
            <CardContent>
                <Typography variant="h4" color="" component="h4" className={classes.title}>
                    <Link to={'/users'} style={{fontWeight: 600}}>{title}</Link>

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={3} className={classes.statSection}>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <ThumbUpAltIcon/> <br/>80 Likes
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <VisibilityIcon/> <br/>80 Views
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        2 min Read
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <IconButton aria-label="addToLibrary">
                            <BookmarkIcon fontSize={"large"}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
