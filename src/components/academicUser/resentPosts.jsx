import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardActionArea, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    displayCard: {
        width: "90%",
        borderRadius: 15,
        margin: "auto"
    },
    topHeading: {
        padding: 10,
        textAlign: "left",
        fontWeight: 600
    }
});

export default function ResentPosts({userID, postID, author}) {
    const classes = useStyles();

    const [stateMorePostData, setStateMorePostData] = useState([]);

    const urlGetMorePosts = "http://localhost:9000/view_article/list_latest_posts";
    const postData = {
        "user_ID": userID,
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

    return (
        <Card style={{width: "80%",padding:10}}>
            <Typography variant="h5" color="primary" component="h5" className={classes.topHeading}>
                More from {author.split(" ")[0]}
            </Typography>
            <div style={{padding: 10,}}>

                {stateMorePostData.map(data =>
                    <Card className={classes.displayCard}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="130"
                                image={data.article.versions[0].coverImage}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Link href={"http://localhost:3000/components/academicUser/viewArticle/" + data._id}
                                          target={"_blank"} style={{textDecoration: "none"}}>
                                        {data.article.versions[0].title}
                                    </Link>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </div>

        </Card>
    )
}
