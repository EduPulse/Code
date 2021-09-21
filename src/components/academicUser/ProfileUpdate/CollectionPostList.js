import React, {useEffect, useState} from 'react'
import axios from 'axios';
import APIURL from '../../API/APIURL'
import { CardHeader, Card, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardStyles: {
        backgroundColor: '#E1D4FC',
        height: 'auto',
        borderRadius: '5px',
        marginBottom: 10,
        padding: 10
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    },
    textStyle: {
        fontSize: '18px',
        textAlign: 'left'
    }
}));

function CollectionPostList({postID}) {

    const classes = useStyles();

    const [post_id, setpost_id] = useState(postID)
    const [postDetails, setpostDetails] = useState([])
    const url_getPost = APIURL("view_article");
    useEffect(() => {
        axios.post(url_getPost, {_id: post_id, visibility: "Academics Only"}).then(function (response) {
            if (response.data) {
                setpostDetails(response.data);
                console.log(postDetails);
            }
        }).catch(function () {
            console.error("Post loading failed");
        })
    }, []);

    // console.log("postDetails: ", postDetails);

    if(postDetails.article){
        return (
            <div>
                {/* <h1>title: {postDetails.article.current.title}</h1>
                <h1>readTime: {postDetails.article.current.readTime}</h1> */}
                <Link className={classes.linkStyles} href={"/components/academicUser/viewArticle/" + postID}>
                    <Card className={classes.cardStyles}>
                        <p className={classes.textStyle}>{postDetails.article.current.title}</p>
                    </Card>
                </Link>
            </div>
        )
    }else{
        return (<span/>)
    }

}

export default CollectionPostList
