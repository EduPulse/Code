import React, {useState} from 'react'
import {Button, Grid, makeStyles, Card} from '@material-ui/core';

import CommentNotifications from './CommentNotifications'
import NotificationsAllInOne from './NotificationsAllInOne'
import PostNotifications from './PostNotifications'
import ReactionNotifications from './ReactionNotifications'
import ViewedNotifications from './ViewedNotifications';
import NewNotifications from './NewNotifications';

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
    const [all, setAll] = useState('block');
    const [post, setPost] = useState('none');
    const [comment, setComment] = useState('none');
    const [reaction, setReaction] = useState('none');
    const [newNotifications, setnewNotifications] = useState('none')
    const [viewedNotifications, setviewedNotifications] = useState('none');

    return (
        <div className={useStyles().root}>
            <Card className={useStyles().cardStyles} >
                <Grid container spacing={2}  className={useStyles().gridTwoStyle} >
                    <Grid item xs={3} className={useStyles().gridTwoItemOneStyle} >
                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("block");
                            setComment("none");
                            setPost("none");
                            setReaction("none");
                            setnewNotifications("none");
                            setviewedNotifications("none");
                        }}>
                            All Notifications
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("none");
                            setComment("none");
                            setPost("block");
                            setReaction("none");
                            setnewNotifications("none");
                            setviewedNotifications("none");
                        }}>
                            Publications
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("none");
                            setComment("block");
                            setPost("none");
                            setReaction("none");
                            setnewNotifications("none");
                            setviewedNotifications("none");
                        }}>
                            Comments
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("none");
                            setComment("none");
                            setPost("none");
                            setReaction("block");
                            setnewNotifications("none");
                            setviewedNotifications("none");
                        }}>
                            Reactions
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("none");
                            setComment("none");
                            setPost("none");
                            setReaction("none");
                            setnewNotifications("block");
                            setviewedNotifications("none");
                        }}>
                            New Notifications
                        </Button>

                        <Button aria-label="recipe" className={useStyles().buttonStyle} onClick={() => {
                            setAll("none");
                            setComment("none");
                            setPost("none");
                            setReaction("none");
                            setnewNotifications("none");
                            setviewedNotifications("block");
                        }}>
                            Viewed Notifications
                        </Button>
                    </Grid>

                    <Grid item xs={8} className={useStyles().gridTwoItemTwoStyle}>
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

                        <Grid style={{display: newNotifications}}>
                            <NewNotifications />
                        </Grid>

                        <Grid style={{display: viewedNotifications}}>
                            <ViewedNotifications />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default AllNotifications