import React from 'react'
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import postStyles from "../ViewArticle/post_decoration.css"
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
    else {
        if (content) {
            const dataObject = JSON.parse(content);
            console.log(dataObject)
            if (dataObject.file_class === "image" || dataObject.file_class === "video") {
                content = {message: "image", url: dataObject.full_url, format: dataObject.file_format}
            } else if (dataObject.file_class === "application") {
                content = {message: "No Preview Available", url: dataObject.full_url, format: dataObject.file_format}
            } else if (dataObject.file_class === "audio") {
                let finalURL = dataObject.full_url.replace("audio", "video") + "." + dataObject.file_format;
                content = {message: "audio", url: finalURL, format: dataObject.file_format}
            }
        }
    }

    const classes = useStyles();

    console.log(content)

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
                            content ? (
                                content.message === "No Preview Available" ? (
                                    <div style={{textAlign: "center", margin: "auto", padding: 50}}>
                                        <span style={{fontSize: 40}}>No Preview Available</span><br/>
                                        <span
                                            style={{fontSize: 30}}>Use download option to save it to your device.</span><br/>
                                        <span
                                            style={{fontSize: 20}}>After you download the file save it as .{content.format} extension.</span>
                                    </div>
                                ) : (
                                    <iframe src={content.url} style={{width: "95%", height: "500px", margin: "auto"}}/>
                                )
                            ) : (
                                <span/>
                            )
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
