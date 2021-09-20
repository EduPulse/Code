import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardActionArea, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import APIURL from "../../API/APIURL";

const useStyles = makeStyles({
    displayCard: {
        width: "90%",
        borderRadius: 15,
        margin: "auto",
        marginTop: 10
    },
    topHeading: {
        padding: 10,
        textAlign: "left",
        fontWeight: 600
    }
});

export default function ResentPosts({authorID, postID, authorName}) {

    const classes = useStyles();

    const [stateMorePostData, setStateMorePostData] = useState([]);

    const urlGetMorePosts = APIURL("view_article/list_latest_posts");
    const postData = {
        "user_ID": authorID,
        "post_ID": postID
    };

    useEffect(() => {
        axios.post(urlGetMorePosts, postData).then(function (response) {
            setStateMorePostData(response.data);
        })
            .catch(function () {
                console.error("load failed");
            })
    }, [urlGetMorePosts]);

    if (stateMorePostData.length !== 0) {
        return (
            <Card style={{padding: 10}}>
                <Typography variant="h5" color="primary" component="h5" className={classes.topHeading}>
                    More from {authorName.split(" ")[0]}
                </Typography>
                <div style={{padding: 10,}}>

                    {stateMorePostData.map(data =>
                        <Card className={classes.displayCard}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="130"
                                    image={data.article.current.coverImage}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {/*TODO changes may possible*/}
                                        <Link
                                            href={"/components/academicUser/viewArticle/" + data._id}
                                            target={"_blank"} style={{textDecoration: "none"}}>
                                            {data.article.current.title}
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </div>

            </Card>
        )
    } else {
        return (
            <span/>
        )
    }
}
