import React, {useEffect, useState} from 'react'
import {Grid, makeStyles} from "@material-ui/core";
import Tags from "../tags";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import PostListing from "./postListing";
import Skeleton from "@material-ui/lab/Skeleton";
import AddListing from "./addListing";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        marginTop: '80px',
        width: '95%'
    },
}));

function SkeletonView() {
    let v = [1, 2, 3]
    return (
        v.map(() =>
            <Card style={{width: 320, height: 467, margin: 10,}}>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                    }
                    title={
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                    }
                    subheader=<Skeleton animation="wave" height={10} width="40%"/>
                />
                <Skeleton animation="wave" variant="rect" style={{paddingTop: '56.25%'}}/>

                <CardContent>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="60%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </React.Fragment>
                </CardContent>
            </Card>
        )
    );
}

export default function AcademicHome() {

    let userID = ""

    let tagSearchID = window.location.href.split('/').slice(-1)[0];

    const [statePostData, setStatePostData] = useState([]);
    useEffect(() => {
        // search by tag
        if (tagSearchID !== "" && window.location.href.split('/').slice(-2)[0] === "tagLookup") {
            axios.post("http://localhost:9000/home_function/search_by_tag", {tag_ID: tagSearchID}).then(function (response) {
                setStatePostData(response.data);
            }).catch(function () {
                console.error("load failed");
            })
        }
        // non-login user listing
        else if (userID === "") {
            axios.get("http://localhost:9000/home_function/non_login_content").then(function (response) {
                setStatePostData(response.data);
            }).catch(function () {
                console.error("load failed");
            })
        }
    }, []);

    // add listing
    const [stateAddData, setStateAddData] = useState([]);
    const urlAddData = "http://localhost:9000/home_function/get_adds";
    useEffect(() => {
        axios.get(urlAddData).then(function (response) {
            setStateAddData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // final post rendering list
    let renderingPostList = []
    // get feasible add count
    let addCountFeasible = Math.ceil(statePostData.length / 10);
    let i = 0;
    let postIndex = 0;
    let addIndex = 0;
    const k = addCountFeasible + statePostData.length;
    while (i < k) {
        if (Math.random() < 0.2 && addCountFeasible > addIndex) {
            renderingPostList.push([false, stateAddData[Math.round(Math.random() * (stateAddData.length - 1))]])
            addIndex++
        } else {
            if (statePostData[postIndex])
                renderingPostList.push([true, statePostData[postIndex++]])
        }
        i++;
    }


    const classes = useStyles();
    return (
        <div align="center">
            <Grid container spacing={2} className={classes.mainGrid}>

                <Grid item xs={3} style={{float: "left"}}>
                    <Typography variant={"h5"} style={{textAlign: "center"}}>Trending Tags</Typography>
                    <Tags/>

                </Grid>

                <Grid item xs={9}>
                    <Grid container spacing={3} style={{display: "flex"}}>
                        {renderingPostList.length ? (
                            renderingPostList.map(item => (

                                item[0] ? (
                                    <PostListing
                                        userID={userID}
                                        postID={item[1]._id}
                                        title={item[1].article.current.title}
                                        author={item[1].author.name}
                                        authorPP={item[1].author.profilePicture}
                                        publishedData={item[1].updatedAt}
                                        coverImage={item[1].article.current.coverImage}
                                        likes={item[1].article.upvotes}
                                        viewCount={item[1].viewCount}
                                        readTime={item[1].article.current.readTime}
                                    />
                                ) : (
                                    item[1]?(
                                    <AddListing publicName={item[1].publicName} media={item[1].advertisements[0].Media}
                                                mediaType={item[1].advertisements[0].type}
                                                link={item[1].advertisements[0].redirectLink}
                                                email={item[1].contactDetails.email}
                                                description={item[1].advertisements[0].Description}/>
                                    ):(
                                        SkeletonView()
                                    )
                                )

                            ))
                        ) : (
                            SkeletonView()
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
