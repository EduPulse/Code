import React, {useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        borderRadius: 15,
        float:"right",
        marginBottom:10,
        marginTop:10,
    },
});


export default function PostComment({name, profilePic, parentComment, postID, userID}) {
    const classes = useStyles();
    const [stateCardWidth,setStateCardWidth]=useState("100%");

    useEffect(() => {
        if(!parentComment)
            setStateCardWidth("80%")
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // call api
            let urlWriteComment = "http://localhost:9000/post_comment/writeComment";
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
                }).catch(function () {
                    console.error("load failed");
                })
            }
        }
    };

    return (
        <Card className={classes.root} variant="outlined" style={{width:stateCardWidth}}>
            <CardContent style={{paddingBottom: 10}}>
                <CardHeader style={{paddingTop: 0,}}
                            avatar={
                                <Avatar alt="Remy Sharp" src={profilePic}/>
                            }
                            title={name}
                />

                <TextField id="commentBox" label="Comment" style={{width: "100%",}} onKeyPress={handleKeyPress}/>

            </CardContent>
        </Card>
    );
}