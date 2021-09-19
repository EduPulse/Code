import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {red} from '@material-ui/core/colors';
import {Link} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

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
    message: {
        textAlign: "justify",
        overflow: "hidden",
        display: "block",
        textDecoration: "none"
    },
    profilePic: {
        width: 50,
        height: 50,
        margin: "auto",

    },
}));

export default function AddListing({publicName, email, mediaType, media, description, link}) {
    const classes = useStyles();
    return (
        <Card className={classes.root} style={{backgroundColor: "#e1dede"}}>
            <CardHeader
                avatar={
                    <Avatar style={{backgroundColor: red[500]}}>Ads</Avatar>
                }
                title={
                    <span className={classes.authorInfo}>
                        <Link href={link}
                              style={{fontWeight: 600, textDecoration: "none"}}>{publicName}</Link>
                    </span>
                }
                subheader={email}
            />
            {
                mediaType === "Image" ? (
                    <CardMedia
                        className={classes.media}
                        image={media}
                    />
                ) : (
                    <iframe src={media} frameBorder="0"/>
                )
            }


            <CardContent style={{margin: 10}}>
                <Link href={link} target={"_blank"} className={classes.message}>{description}</Link>
            </CardContent>
        </Card>
    );
}
