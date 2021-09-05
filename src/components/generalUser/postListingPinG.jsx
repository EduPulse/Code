import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {Link} from "@material-ui/core";
import {formatDistance} from 'date-fns'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
        height: 467,
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
        height: 85,
        overflow: "hidden",
    },
    profilePic: {
        width: 50,
        height: 50,
        margin: "auto",

    },
}));


export default function PostListingPin({
                                           pinMessage,
                                           originalPostID,
                                           title,
                                           coverImage,
                                           authorName,
                                           authorID,
                                           publishedData,
                                       }) {

    const classes = useStyles();

    const [isShown, setIsShown] = useState("hidden");

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar style={{backgroundColor: "#4411A8"}}>PIN</Avatar>
                }
                title={
                    <span className={classes.authorInfo}>
                        <Link href={"/components/academicUser/userProfile/" + authorID}
                              style={{fontWeight: 600, textDecoration: "none"}}>{authorName}</Link>
                    </span>
                }
                subheader={formatDistance(new Date(publishedData), new Date(), {addSuffix: true})}
            />
            <CardContent style={{
                marginTop: 0,
                paddingTop: 0,
                height: isShown,
                display: "block",
                overflow: "hidden",
                backgroundColor: "#fff",
                marginBottom: 5
            }}>
                <span style={{textAlign: "justify", display: "block"}}
                      onMouseEnter={() => setIsShown("auto")}
                      onMouseLeave={() => setIsShown("15%")}>{pinMessage}</span>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={coverImage}
            />
            <CardContent>
                <Typography variant="h4" color="" component="h4" className={classes.title}>
                    <Link href={'/components/academicUser/viewArticle/' + originalPostID} style={{
                        fontWeight: 600,
                        textDecoration: "none",
                        height: 85,
                        overflow: "hidden"
                    }}>{title}</Link>

                </Typography>
            </CardContent>
        </Card>
    );
}
