import React, {useEffect, useState} from 'react'
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

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

export default function Article({articleID, customWidth, coverImage, title, tagList, content, licence}) {
    const color = Array('primary', 'default', 'secondary');
    let [stateTagList, setStateTagList] = useState([]);
    // call api to get all tags
    // load tags
    const urlGetTags = "http://localhost:9000/tag_operation/";
    useEffect(() => {
        axios.get(urlGetTags).then(function (response) {
            let i = 0;
            let tags = [];
            response.data.map(data => {
                tagList.map(postTag => {
                    // compare tag ids and create tag list to show
                    if (data._id == postTag)
                        tags[i++] = {id: data._id, verbose: data.verbose};
                })
            })
            setStateTagList(tags);
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlGetTags]);
    const classes = useStyles();
    return (
        <div>
            <div align="center" style={{width: customWidth}}>
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
                            <div>
                                {/*TODO can create link based on tags myTag.id contains tagID*/}
                                {stateTagList.map(myTag =>
                                    <Button color={color[Math.floor(Math.random() * 3)]}
                                            className={classes.tags}>#{myTag.verbose}</Button>
                                )}
                            </div>
                        </CardContent>

                    </CardActionArea>
                    <hr/>
                    <CardActions>
                        <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}>
                            {/*post content hear*/}
                        </div>
                    </CardActions>
                    <hr/>
                    <div className={classes.contentFooter}>
                        <span>Repost abuse</span><br/>
                        {licence !== "" ? (
                            <a href={"https://creativecommons.org/about/cclicenses/"} target={"_blank"}
                               style={{textDecoration: "none"}}>
                                <img className={classes.ccImage}
                                     src={'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/' + licence + '.png'}
                                     alt={"CC Licence Image"}/>
                            </a>
                        ) : (
                            <span></span>
                        )}

                    </div>
                </Card>
            </div>
        </div>
    )
}
