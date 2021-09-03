import React from 'react'
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import postStyles from "../../../assets/styles/post_decoration.css"
import DoReport from "./doReport";
import ArticleTags from "./articleTags";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: 30,
    },
    media: {
        height: 350,
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
    },
    tags: {
        margin: theme.spacing(1),
        fontWeight: "bold",
        borderRadius: '50px',
        fontSize: 17
    },
    content: {
        fontSize: 20,
        margin: 20,
    },
    contentFooter: {
        textAlign: "center",
        display: "block",
        padding: 10,
    },
    ccImage: {
        width: 150,
        display: "block",
        padding: 20,
        float: "right",
    },
}));

export default function Article({userID, type, articleID, customWidth, coverImage, title, tagList, content, licence}) {

    // add styles file for content rendering page
    if (type === "article")
        content = "<style>" + postStyles + "</style><div class='content-wrap'>" + content + "</div>"

    const classes = useStyles();
    return (
        <div>
            <div align="center" style={{width: customWidth}} id={"printable-article"}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={coverImage}
                            title="Cover Image"
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h2" className={classes.title}>
                                {title}
                            </Typography>
                            <br/>
                            <ArticleTags tagList={tagList}/>
                        </CardContent>

                    </CardActionArea>
                    <hr/>
                    <CardActions>

                        {type === "article" ? (
                            <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}>
                                {/*post content hear*/}
                            </div>
                        ) : (
                            <iframe src={content} style={{width: "95%", height: "500px", margin: "auto"}}/>
                        )}

                    </CardActions>
                    <hr/>
                    <div className={classes.contentFooter}>
                        {licence !== "" ? (
                            <div>
                                <DoReport userID={userID} objectID={articleID} goingToReport={"post"}/>
                                <a href={"https://creativecommons.org/about/cclicenses/"} target={"_blank"}
                                   style={{textDecoration: "none"}}>
                                    <img className={classes.ccImage}
                                         src={'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/' + licence + '.png'}
                                         alt={"CC Licence Image"}/>
                                </a>
                            </div>
                        ) : (
                            <span/>
                        )}

                    </div>
                </Card>
            </div>
        </div>
    )
}
