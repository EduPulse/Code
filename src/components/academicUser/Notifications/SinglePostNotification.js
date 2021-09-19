import React, {useEffect, useState} from 'react';
import {Link} from '@material-ui/core';
import {makeStyles,} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import APIURL from '../../API/APIURL'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        marginBottom: '10px',
        background: '#E1D4FC',
    },
    avatar: {
        backgroundColor: '#935FF9',
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

function SinglePostNotification({description}) {
    const classes = useStyles();

    let msgArray = [];
    msgArray = description.split("\"");

    const postID = msgArray[3];
    const reactorID = msgArray[7];
    const content = msgArray[11];

    // ['{', 
    // 'post_id', ':', '6130fcb315d5b887f858c909', ',', 
    // 'user_or_author_id', ':', '60ed8d6597a4670ca060ed6b', ',', 
    // 'message', ':', 'Heshan jayasuriya reacted to your(contributed) publication.', 
    // '}']

    console.log("postID: ", postID);
    console.log("reactorID: ", reactorID);
    console.log("content: ", content);

    const [reactorProfile, setreactorProfile] = useState([])
    const userData = {"_id": reactorID}
    const url_getReactorProfile = APIURL("loggedIn_User/");
    useEffect(() => {
        axios.post(url_getReactorProfile, userData).then(function (response) {
            setreactorProfile(response.data);
        }).catch(function () {
            console.error("Reactor Profile loading failed");
        })
    }, []);

    const [postData, setpostData] = useState([])
    const postDetails = {"_id": postID}
    const url_getPostData = APIURL("loggedIn_User/get_post");
    useEffect(() => {
        axios.post(url_getPostData, postDetails).then(function (response) {
            setpostData(response.data);
        }).catch(function () {
            console.error("Post Data loading failed");
        })
    }, []);

    return (
        <div>
            <Link className={classes.linkStyles} href={"/components/academicUser/viewArticle/" + postID}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Profile image" className={classes.avatar}
                                    src={reactorProfile.profilePicture}/>
                        }
                        title={postData.article ? (postData[0].article.current.title) : ("")}
                        subheader={content}
                    />
                </Card>
            </Link>
        </div>
    );
}

export default SinglePostNotification
