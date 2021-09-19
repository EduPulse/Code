import React, {useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";
import APIURL from "../../API/APIURL";

const useStyles = makeStyles({
    root: {
        borderRadius: 15,
        float: "right",
        marginBottom: 10,
        marginTop: 10,
    },
});


export default function PostComment({parentComment, postID, userID}) {
    const classes = useStyles();
    const [stateCardWidth, setStateCardWidth] = useState("100%");

    useEffect(() => {
        if (!parentComment)
            setStateCardWidth("80%")
    }, []);

    // load commenter info
    const [stateUserData, setStateUserData] = useState([]);
    const urlGetUserInfo = APIURL("get_user_data/");

    useEffect(() => {
        axios.post(urlGetUserInfo, {"_id": userID}).then(function (response) {
            setStateUserData(response.data[0]);
        })
            .catch(function () {
                console.error("load failed");
            })
    }, []);
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // call api
            let urlWriteComment = APIURL("post_comment/writeComment");
            let data = {
                "post_ID": postID,
                "user_ID": userID,
                "comment_content": event.target.value

            }
            // clean text field
            event.target.value = "";

            if (parentComment) {
                axios.post(urlWriteComment, data).then(function (response) {
                    console.log("done write comment")
                    window.location.reload();
                }).catch(function () {
                    console.error("load failed");
                })
            }
        }
    };

    return (
        <Card className={classes.root} variant="outlined" style={{width: stateCardWidth}}>
            <CardContent style={{paddingBottom: 10}}>
                <CardHeader style={{paddingTop: 0, textAlign: "left"}}
                            avatar={
                                <Avatar alt="Remy Sharp" src={stateUserData.profilePicture}/>
                            }
                            title={stateUserData.name}
                />

                <TextField id="commentBox" label="Comment" style={{width: "100%",}} onKeyPress={handleKeyPress}/>

            </CardContent>
        </Card>
    );
}