import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Publication from "../subComponents/publication";
import Grid from "@material-ui/core/Grid";
import {Card, CircularProgress, Paper, Radio} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import UserCard from '../subComponents/userCard';
import axios from "axios";
import PublicationPin from "../subComponents/publicationPin";
import APIURL from "../../API/APIURL";
import {user} from "../../auth/auth";
import PublicationVersion from "../subComponents/publicationVersion";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
        position: "absolute",
    },
    pageContent: {
        paddingTop: 100,
        margin: 30,
    },
    title: {
        color: "#4411A8",
        fontWeight: "bold",
        paddingBottom: 15,
    },
    summary: {
        borderRadius: 5,
        padding: 10,
        textAlign: "center",
        width: "80%",
        margin: "auto",
    },
    summaryValue: {
        color: "#4411A8",
        fontWeight: "bold",
        padding: 10,
        textAlign: "center"
    },
    showInfoSection: {
        marginTop: 20,
    },
    optionButton: {
        color: "#fff",
        backgroundColor: "#4411A8",
        margin: 8,
        padding: 10,
        width: "80%",
        borderRadius: 5,
        textAlign: "left",
    },
    emptyResult: {
        margin: "auto",
        paddingTop: 80,
        fontSize: 50,
        textAlign: "center",
    },
    topBar: {
        width: "-moz-fit-content",
        margin: "auto",
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10
    }
}));

export default function AcademicDashboard() {
    const classes = useStyles();
    const [statePublication, setStatePublication] = useState('block');
    const [stateFollowers, setStateFollowers] = useState('none');
    const [stateFollowings, setStateFollowings] = useState('none');


    let userID = ""
    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
    }

    const [statePublicationData, setStatePublicationData] = useState([]);
    const [statePublicationVersionData, setStatePublicationVersionData] = useState([]);
    const [stateDisplayEntry, setStateDisplayEntry] = useState([]);

    const [stateFollowersData, setStateFollowersData] = useState([]);
    const [stateFollowingUsers, setStateFollowingUsers] = useState([]);

    // load articles done by user
    const urlGetPublications = APIURL("dashboard_operation/get_all_publication");
    useEffect(() => {
        axios.post(urlGetPublications, {user_id: userID}).then(function (response) {
            if (response.data) {
                setStatePublicationData(response.data);
                let dataArray = []
                response.data.map(data => {
                    if (data.type === "article" || data.type === "document") {
                        dataArray.push(data);
                    }
                })
                setStateDisplayEntry(dataArray)
            }

        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    useEffect(() => {
        // load user versioned articles
        axios.post(APIURL("dashboard_operation/list_versioned_posts"), {user_id: userID}).then(function (response) {
            if (response.data) {
                setStatePublicationVersionData(response.data);
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // load followers data
    const urlGetFollowers = APIURL("dashboard_operation/list_followers");
    useEffect(() => {
        axios.post(urlGetFollowers, {user_id: userID}).then(function (response) {
            if (response.data)
                setStateFollowersData(response.data.followers);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // load fallowing users
    const urlGetFollowingUsers = APIURL("dashboard_operation/list_following_users");
    useEffect(() => {
        axios.post(urlGetFollowingUsers, {user_id: userID}).then(function (response) {
            if (response.data)
                setStateFollowingUsers(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // get counts
    let followerCount = 0;
    let likeCount = 0;
    let viewCount = 0;
    stateFollowersData.map(() => followerCount++);
    statePublicationData.map(data => {
        if (data.type !== "pin") {
            data.article.upvotes.map(votes => {
                if (typeof votes.by !== 'undefined')
                    likeCount++;
            })
            viewCount = viewCount + data.viewCount
        }
    });

    // loading timeout
    const [timeOut, setTimeOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeOut(true);
        }, 6000);
    }, []);


    // top bar operation
    const [stateCheckAll, setStateCheckAll] = useState(false);
    const [stateCheckPinnedArticle, setStateCheckPinnedArticle] = useState(false);
    const [stateCheckVersionedArticle, setStateCheckVersionedArticle] = useState(false);
    const [stateCheckPublishedArticle, setStateCheckPublishedArticle] = useState(true);

    const handleChangePinnedArticle = () => {
        setStateCheckPinnedArticle(true)
        setStateCheckAll(false)
        setStateCheckPublishedArticle(false)
        setStateCheckVersionedArticle(false)

        let dataArray = []
        statePublicationData.map(data => {
            if (data.type === "pin") {
                dataArray.push(data);
            }
        }) 
        setStateDisplayEntry(dataArray)

    }
    const handleChangeVersionedArticle = () => {
        setStateCheckVersionedArticle(true)
        setStateCheckAll(false)
        setStateCheckPublishedArticle(false)
        setStateCheckPinnedArticle(false)

        setStateDisplayEntry(statePublicationVersionData)
    }
    const handleChangePublishedArticle = () => {
        setStateCheckPublishedArticle(true)
        setStateCheckAll(false)
        setStateCheckVersionedArticle(false)
        setStateCheckPinnedArticle(false)

        let dataArray = []
        statePublicationData.map(data => {
            if (data.type === "article") {
                dataArray.push(data);
            }
        })
        setStateDisplayEntry(dataArray)


    }
    const handleChangeAll = () => {
        setStateCheckAll(true)
        setStateCheckPublishedArticle(false)
        setStateCheckVersionedArticle(false)
        setStateCheckPinnedArticle(false)

        setStateDisplayEntry([...statePublicationData, ...statePublicationVersionData]);
    }

    return (
        <div>
            <div className={classes.pageContent}>
                <Grid container spacing={3}>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <Typography variant="h3" component="h3" className={classes.title}>
                            Dashboard
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <PeopleIcon style={{fontSize: 45}}/> &nbsp; {followerCount}
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Followers
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <ThumbUpAltIcon style={{fontSize: 45}}/> &nbsp; {likeCount}
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Likes
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <VisibilityIcon style={{fontSize: 45}}/> &nbsp; {viewCount}
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Views
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <div className={classes.showInfoSection}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Button className={classes.optionButton} onClick={() => {
                                        setStatePublication("block");
                                        setStateFollowers("none");
                                        setStateFollowings("none");
                                    }}>Publications</Button><br/>
                                    <Button className={classes.optionButton} onClick={() => {
                                        setStatePublication("none");
                                        setStateFollowers("flex");
                                        setStateFollowings("none");
                                    }}>Followers</Button><br/>
                                    <Button className={classes.optionButton} onClick={() => {
                                        setStatePublication("none");
                                        setStateFollowers("none");
                                        setStateFollowings("flex");
                                    }}>Fallowing Users</Button>
                                </Grid>
                                <Grid item xs={9}>

                                    <div style={{display: statePublication}}>
                                        <Card className={classes.topBar}>
                                            <Radio
                                                color={"primary"}
                                                onChange={handleChangeAll}
                                                checked={stateCheckAll}
                                            /> All
                                            <Radio
                                                color={"primary"}
                                                onChange={handleChangePublishedArticle}
                                                checked={stateCheckPublishedArticle}
                                            /> Published Article
                                            <Radio
                                                color={"primary"}
                                                onChange={handleChangeVersionedArticle}
                                                checked={stateCheckVersionedArticle}
                                            /> Versioned Article
                                            <Radio
                                                color={"primary"}
                                                onChange={handleChangePinnedArticle}
                                                checked={stateCheckPinnedArticle}
                                            /> Pinned Article
                                        </Card>
                                        <div style={{margin: "auto"}}>
                                            {
                                                stateDisplayEntry.length > 0 ? (
                                                    stateDisplayEntry.map(data =>
                                                            data.type !== "pin" ? (
                                                                data.author === userID ? (
                                                                    data.article.current ? (
                                                                        <div style={{margin: "auto"}}>
                                                                            <Publication title={data.article.current.title}
                                                                                         userID={userID}
                                                                                         type={data.type}
                                                                                         postID={data._id} postData={data}/>
                                                                        </div>
                                                                    ) : (
                                                                        <span/>
                                                                    )
                                                                ) : (
                                                                    <PublicationVersion title={data.article.current.title}
                                                                                        userID={userID}
                                                                                        postID={data._id} postData={data}/>
                                                                )
                                                            ) : (
                                                                // console.log(data.pin.originalPost._id)
                                                                data.pin.originalPost?(
                                                                    <PublicationPin
                                                                        title={data.pin.originalPost.article.current.title}
                                                                        originalPostID={data.pin.originalPost._id}
                                                                        postID={data._id}
                                                                        postData={data}/>
                                                                ):(<span/>)
                                                            )
                                                        // console.log(data)
                                                    )
                                                ) : (
                                                    timeOut ? (
                                                        <h2 className={classes.emptyResult}>
                                                            No publications belongs to you..<br/>
                                                            <small>Write/publish your thought with EduPulse, using <i>CREATE
                                                                POST</i> option.</small>
                                                        </h2>
                                                    ) : (
                                                        <div style={{paddingTop: 250,}}>
                                                            <CircularProgress/>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>

                                    </div>
                                    <Grid container spacing={3} style={{display: stateFollowers}}>
                                        {
                                            stateFollowersData.length > 0 ? (
                                                stateFollowersData.map(data => <UserCard userID={data}/>)
                                            ) : (
                                                timeOut ? (
                                                    <h2 className={classes.emptyResult}>
                                                        Others do not fallow you yet.<br/>
                                                        <small>Write/publish good content on the system to have a good
                                                            follower base.</small>
                                                    </h2>
                                                ) : (
                                                    <div style={{paddingTop: 250,}}>
                                                        <CircularProgress/>
                                                    </div>
                                                )
                                            )
                                        }
                                    </Grid>

                                    <Grid container spacing={3} style={{display: stateFollowings}}>
                                        {
                                            stateFollowingUsers.length > 0 ? (
                                                stateFollowingUsers.map(data => <UserCard userID={data._id}/>)
                                            ) : (
                                                timeOut ? (
                                                    <h2 className={classes.emptyResult}>
                                                        You are not follow other users yet.<br/>
                                                        <small>Fallow other users to look there valuable content as soon
                                                            as
                                                            they publish.</small>
                                                    </h2>
                                                ) : (
                                                    <div style={{paddingTop: 250,}}>
                                                        <CircularProgress/>
                                                    </div>
                                                )
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </div>
        </div>
    )
}
