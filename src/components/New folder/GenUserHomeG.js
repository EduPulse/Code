import React, {useEffect, useState} from 'react'
import {Grid, makeStyles} from "@material-ui/core";
import Tags from "../tags";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import PostListing from "./postListingG";
import Skeleton from "@material-ui/lab/Skeleton";
import AddListing from "./addListingG";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PostListingPin from "./postListingPinG";

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
    // TODO need to get data form glob
    let userID = "60ecfe51395a1704a42d8cae"
    let userRole = "academic";

    let tagSearchID = window.location.href.split('/').slice(-1)[0];

    const [statePostData, setStatePostData] = useState([]);
    const [statePostDataAcademic, setStatePostDataAcademic] = useState([]);
    const [statePostDataGeneral, setStatePostDataGeneral] = useState([]);
    const [statePostDataFallow, setStatePostDataFallow] = useState([]);
    const [statePostDataFallowTag, setStatePostDataFallowTag] = useState([]);
    useEffect(() => {
        // search by tag
        if (tagSearchID !== "" && window.location.href.split('/').slice(-2)[0] === "tagLookup") {
            axios.post("http://localhost:9000/home_function/search_by_tag", {tag_ID: tagSearchID}).then(function (response) {
                setStatePostData(response.data);
            }).catch(function () {
                console.error("load failed");
            })
        } else {
            // login user content
            if (userID !== "") {
                // academic only content
                if (userRole === "academic")
                    axios.get("http://localhost:9000/home_function/academic_content").then(function (response) {
                        setStatePostDataAcademic(response.data);
                    }).catch(function () {
                        console.error("load failed");
                    })
                // followers latest articles
                axios.post("http://localhost:9000/home_function/get_post_form_followers", {user_ID: userID}).then(function (response) {
                    setStatePostDataFallow(response.data);
                }).catch(function () {
                    console.error("load failed");
                })
                // following tag latest
                axios.post("http://localhost:9000/home_function/get_post_form_following_tags", {user_ID: userID}).then(function (response) {
                    setStatePostDataFallowTag(response.data);
                }).catch(function () {
                    console.error("load failed");
                })
            }
            // anyone type content
            axios.get("http://localhost:9000/home_function/non_login_content").then(function (response) {
                setStatePostDataGeneral(response.data);
            }).catch(function () {
                console.error("load failed");
            })

        }
    }, []);

    useEffect(() => {
        let newList = []
        statePostDataAcademic.map(data => newList.push(data))
        statePostDataGeneral.map(data => newList.push(data))
        statePostDataFallow.map(data => newList.push(data))
        statePostDataFallowTag.map(data => newList.push(data))

        // remove duplicates
        let check = new Set();
        let uniqueData = newList.filter(obj => !check.has(obj["_id"]) && check.add(obj["_id"]))

        setStatePostData(uniqueData)

    }, [statePostDataAcademic, statePostDataGeneral, statePostDataFallow])

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
                                    item[1].type !== "pin" ? (
                                        <PostListing
                                            userID={userID}
                                            authorID={item[1].author._id}
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
                                        // console.log(item[1])
                                        <PostListingPin originalPostID={item[1].pin.originalPost._id}
                                                        title={item[1].pin.originalPost.article.current.title}
                                                        authorID={item[1].author._id} authorName={item[1].author.name}
                                                        coverImage={item[1].pin.originalPost.article.current.coverImage}
                                                        publishedData={item[1].createdAt}
                                                        pinMessage={item[1].pin.pinComment}/>
                                    )
                                ) : (
                                    item[1] ? (
                                        <AddListing publicName={item[1].publicName}
                                                    media={item[1].advertisements[0].Media}
                                                    mediaType={item[1].advertisements[0].type}
                                                    link={item[1].advertisements[0].redirectLink}
                                                    email={item[1].contactDetails.email}
                                                    description={item[1].advertisements[0].Description}/>
                                    ) : (
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
