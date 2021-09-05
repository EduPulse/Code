import React, {useState} from 'react'

import {Button, Grid, makeStyles} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';

import CommentNotifications from './CommentNotifications'
import NotificationsAllInOne from './NotificationsAllInOne'
import PostNotifications from './PostNotifications'
import ReactionNotifications from './ReactionNotifications'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
        marginTop: 100,
    },
    pubPostInfo: {
        width: '80%',
    },
    postsInfo: {
        width: '100%',
    },
    avatar: {
        backgroundColor: '#935FF9',
    },
    headerInfo: {
        marginTop: '90px',
        marginBottom: '10px',
        marginLeft: '110px',
        width: '100%'
    },
    controlStyle: {
        backgroundColor: '#C5B6E3',
    },
    buttonStyleCancel: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginLeft: '20px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#A50000',
        },
        marginBottom: '20px'
    },
    buttonStyleMain: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
        marginBottom: '20px'
    },
    buttonStyleSub: {
        backgroundColor: '#b3b3cc',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
        marginBottom: '20px'
    },
    buttonStyleSubmit: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        paddingLeft: '20px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
        marginBottom: '20px'
    },
    buttonStyleCancel: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginLeft: '20px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#A50000',
        },
        marginBottom: '20px'
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '80%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px'
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    }
}));

function TryFunct() {
    const [all, setAll] = useState('block');
    const [post, setPost] = useState('none');
    const [comment, setComment] = useState('none');
    const [reaction, setReaction] = useState('none');

    return (
        <div>
            <div align='center'>
                <div className={useStyles().root}>
                    <Grid container spacing={2} className={useStyles().pubPostInfo}>
                        <Grid item xs className={useStyles().postsInfo}>
                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setAll("block");
                                setComment("none");
                                setPost("none");
                                setReaction("none");
                            }}>
                                All Notifications
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setAll("none");
                                setComment("none");
                                setPost("block");
                                setReaction("none");
                            }}>
                                Publications
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setAll("none");
                                setComment("block");
                                setPost("none");
                                setReaction("none");
                            }}>
                                Comments
                            </Button>

                            <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                                setAll("none");
                                setComment("none");
                                setPost("none");
                                setReaction("block");
                            }}>
                                Reactions
                            </Button>
                        </Grid>

                        <Grid item xs={8} className={useStyles().postsInfo}>
                            <Grid style={{display: all}}>
                                <NotificationsAllInOne/>
                            </Grid>

                            <Grid style={{display: post}}>
                                <PostNotifications/>
                            </Grid>

                            <Grid style={{display: comment}}>
                                <CommentNotifications/>
                            </Grid>

                            <Grid style={{display: reaction}}>
                                <ReactionNotifications/>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
}

export default TryFunct

