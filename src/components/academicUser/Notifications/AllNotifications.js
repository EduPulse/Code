import React, {useState, useEffect } from 'react'
import {Button, Grid, makeStyles, Card} from '@material-ui/core';
import axios from 'axios';

import CommentNotifications from './CommentNotifications'
import PostNotifications from './PostNotifications'
import ReactionNotifications from './ReactionNotifications'

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
    const userID = '60ecfe51395a1704a42d8cae';
    const userData = {"_id": userID}
    const url_notifications = "http://localhost:9000/loggedIn_User/get_notifications";
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
        // console.log(notification.title);
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
                            <PostNotifications
                                postArray = {postNotifications}
                            />
                        </Grid>

                        <Grid style={{display: comment}}>
                            <CommentNotifications
                                commentArray = {commentNotifications}
                            />
                        </Grid>

                        <Grid style={{display: reaction}}>
                            <ReactionNotifications
                                reactionArray = {reactNotifications}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default AllNotifications