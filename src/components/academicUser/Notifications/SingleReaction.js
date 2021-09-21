import React, {useEffect, useState} from 'react';
import {Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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

function SingleReaction({description}) {
    const classes = useStyles();

    // console.log("description: ", description);
    let msgArray = [];
    msgArray = description.split("\"");

    const postID = msgArray[3];
    const reactorID = msgArray[7];
    const content = msgArray[11];
    const title = msgArray[15];
    const datePublished = msgArray[19];
    console.log(datePublished)
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

    let publishedData = "";
    if (datePublished)
        publishedData = datePublished.split("GMT")[0];

    return (
        <div>
            <Link className={classes.linkStyles} href={"/components/academicUser/viewArticle/" + postID}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Profile image" className={classes.avatar}
                                    src={reactorProfile.profilePicture}/>
                        }
                        title={title}
                        subheader={[content.split('.')[0], " on ", publishedData]}
                    />
                </Card>
            </Link>
        </div>
    );
}

export default SingleReaction