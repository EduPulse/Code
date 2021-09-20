import React, {useEffect, useState} from 'react'
import {Button, Card, Grid, makeStyles} from '@material-ui/core';
import axios from 'axios';
import APIURL from '../../API/APIURL'
import CommentNotifications from './CommentNotifications'
import PostNotifications from './PostNotifications'
import ReactionNotifications from './ReactionNotifications'
import {user} from "../../auth/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '80%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        '&:focus': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px',
        marginLeft: '30px'
    },
    cardStyles: {
        backgroundColor: '#FFFFFF',
        width: '96%',
        marginLeft: '150px',
        marginTop: '100px',
        borderRadius: '5px',
        marginBottom: '20px',
        padding: 10,
        paddingTop: 40
    },
    gridTwoStyle: {
        marginTop: 10,
        width: '100%',
        marginBottom: '15px'
    },
    gridTwoItemOneStyle: {
        marginLeft: '20px'
    },
    gridTwoItemTwoStyle: {
        marginLeft: '20px'
    },
}));

function AllNotifications() {

    const [post, setPost] = useState('block');
    const [comment, setComment] = useState('none');
    const [reaction, setReaction] = useState('none');

    const [notications, setnotications] = useState([])
    const userID = user()._id;
    const userData = {"_id": userID}
    const url_notifications = APIURL("loggedIn_User/get_notifications");
    useEffect(() => {
        axios.post(url_notifications, userData).then(function (response) {
            setnotications(response.data);
        }).catch(function () {
        console.error("Notifications loading failed");
        })
    }, []);

    const postNotifications = [];
    const reactNotifications = [];
    const commentNotifications = [];
    const otherNotifications = [];

    notications.map(notification => {
        if (notification.title === "publication") {
            postNotifications.push(notification)
        } 
        else if (notification.title === "reaction") {
            reactNotifications.push(notification)
        }
        else if (notification.title === "comment") {
            commentNotifications.push(notification)
        }
        else {
            otherNotifications.push(notification)
        }
    })

    return (
        <div className={useStyles().root}>
            <Card className={useStyles().cardStyles} >
                <Grid container spacing={2}  className={useStyles().gridTwoStyle} >
                    <Grid item xs={3} className={useStyles().gridTwoItemOneStyle} >
                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setComment("none");
                            setPost("block");
                            setReaction("none");
                        }}>
                            Publications
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setComment("block");
                            setPost("none");
                            setReaction("none");
                        }}>
                            Comments
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setComment("none");
                            setPost("none");
                            setReaction("block");
                        }}>
                            Reactions
                        </Button>
                    </Grid>

                    <Grid item xs={8} className={useStyles().gridTwoItemTwoStyle}>
                        <Grid style={{display: post}}>
                            {
                                postNotifications.length>0?(
                                    <PostNotifications
                                        postArray = {postNotifications}
                                    />
                                ):(
                                    <h2 style={{
                                        margin: "auto",
                                        paddingTop: 10,
                                        fontSize: 40,
                                        textAlign: "center",
                                    }}>
                                        You have got no new notifications related to publications.<br/>
                                    </h2>
                                )
                            }
                        </Grid>

                        <Grid style={{display: comment}}>
                            {
                                commentNotifications.length>0?(
                                    <CommentNotifications
                                        commentArray = {commentNotifications}
                                    />
                                ):(
                                    <h2 style={{
                                        margin: "auto",
                                        paddingTop: 10,
                                        fontSize: 40,
                                        textAlign: "center",
                                    }}>
                                        You have got no new comments for your publications.<br/>
                                    </h2>
                                )
                            }

                        </Grid>

                        <Grid style={{display: reaction}}>
                            {
                                reactNotifications.length>0?(
                                    <ReactionNotifications
                                        reactionArray = {reactNotifications}
                                    />
                                ):(
                                    <h2 style={{
                                        margin: "auto",
                                        paddingTop: 10,
                                        fontSize: 40,
                                        textAlign: "center",
                                    }}>
                                        You have got no new reactions for your publications.<br/>
                                    </h2>
                                )
                            }

                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default AllNotifications