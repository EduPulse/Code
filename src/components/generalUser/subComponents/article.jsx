import React from 'react'
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
// import postStyles from "../ViewArticle/post_decoration.css"
import DoReport from "./doReport";
import ArticleTags from "./articleTags";

const postStyle = () => {
    return "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');\n" +
        "\n" +
        ".content-wrap {\n" +
        "    margin: 30px;\n" +
        "    font-family: 'Noto Sans', sans-serif;\n" +
        "}\n" +
        "\n" +
        "h2, h3, h4 {\n" +
        "    color: rgba(51, 51, 51, 0.76);\n" +
        "    font-weight: bold;\n" +
        "    text-align: left;\n" +
        "    margin-top: 7px;\n" +
        "    padding-top: 0;\n" +
        "    margin-bottom: 7px;\n" +
        "    padding-bottom: 0;\n" +
        "    display: block;\n" +
        "}\n" +
        "\n" +
        "h2 {\n" +
        "    font-size: 50px;\n" +
        "}\n" +
        "\n" +
        "h3 {\n" +
        "    font-size: 40px;\n" +
        "}\n" +
        "\n" +
        "h4 {\n" +
        "    font-size: 32px;\n" +
        "}\n" +
        "\n" +
        "p {\n" +
        "    text-align: justify;\n" +
        "    color: #333333;\n" +
        "    font-size: 20px;\n" +
        "}\n" +
        "\n" +
        "ul, li {\n" +
        "    color: #333333;\n" +
        "    font-size: 20px;\n" +
        "    text-align: left;\n" +
        "}\n" +
        "\n" +
        "a {\n" +
        "    color: #a430c7;\n" +
        "    text-decoration: underline;\n" +
        "}\n" +
        "\n" +
        "a:hover {\n" +
        "    color: #333333;\n" +
        "    text-decoration: underline;\n" +
        "}\n" +
        "\n" +
        "blockquote {\n" +
        "    margin: auto;\n" +
        "    border: 1px solid gray;\n" +
        "    border-left: 14px solid gray;\n" +
        "    width: fit-content;\n" +
        "    padding: 15px 100px;\n" +
        "    border-radius: 10px;\n" +
        "    font-size: 20px;\n" +
        "\n" +
        "}\n" +
        "\n" +
        "table {\n" +
        "    margin-top: 7px;\n" +
        "    padding-top: 0;\n" +
        "    border-collapse: collapse;\n" +
        "    width: 75%;\n" +
        "    margin-left: auto;\n" +
        "    margin-right: auto;\n" +
        "    font-size: 20px;\n" +
        "}\n" +
        "\n" +
        "table, td, th {\n" +
        "    border: 1px solid #ddd;\n" +
        "    text-align: left;\n" +
        "}\n" +
        "\n" +
        "\n" +
        "th, td {\n" +
        "    padding: 15px;\n" +
        "}\n" +
        "\n" +
        "th {\n" +
        "    font-weight: 800;\n" +
        "    text-align: center;\n" +
        "    background-color: gray;\n" +
        "    color: white;\n" +
        "}\n" +
        "\n" +
        "tr:hover {\n" +
        "    background-color: rgba(20, 20, 18, 0.116);\n" +
        "}\n" +
        "\n" +
        "img {\n" +
        "    width: 500px;\n" +
        "    margin: auto;\n" +
        "}"
}


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
    if (type === "article"){
        content = "<style>" + postStyle() + "</style><div class='content-wrap'>" + content + "</div>"
        console.log(content);
    }
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
