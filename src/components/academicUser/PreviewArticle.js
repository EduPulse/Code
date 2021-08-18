import React, {useEffect, useState} from 'react'
import NavBarWP from "./navBarWP";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";
import axios from "axios";
import previewImage from '../../assets/previewImage.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
        position: "absolute",
    },
    article: {
        paddingTop: 100,
        position: "inherit",
        display: "block",
        width: "60%",
        margin: "auto",
    }
}));

export default function PreviewArticle() {
    const classes = useStyles();
    const articleID = "6116382d81040e6b5c856638"
    console.log(articleID)

    let [statePostData, setStatePostData] = useState([]);
    // data loading for post
    const urlGetPostInfo = "http://localhost:9000/view_article/preview_article";
    useEffect(() => {
        axios.post(urlGetPostInfo, {"_id": articleID}).then(function (response) {
            setStatePostData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    if (statePostData.length !== 0)
        return (
            <div>
                <NavBarWP className={classes.navBar}/>

                <div className={classes.article}>
                    <Article
                        articleID={statePostData._id}
                        coverImage={previewImage}
                        title={statePostData.article.versions[0].title}
                        content={statePostData.article.versions[0].content}
                        licence={""}
                        tags={[]} customWidth={"100%"}/>
                </div>

            </div>
        )
    else
        return (
            <span/>
        )

}
