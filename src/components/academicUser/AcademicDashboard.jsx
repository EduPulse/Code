import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Publication from "./subComponents/publication";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import UserCard from './subComponents/userCard';
import axios from "axios";
import PublicationPin from "./subComponents/publicationPin";
import APIURL from "../API/APIURL";
import {user} from "../auth/auth";

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
    }
}));

export default function AcademicDashboard() {
    const classes = useStyles();
    const [statePublication, setStatePublication] = useState('block');
    const [stateFollowers, setStateFollowers] = useState('none');
    const [stateFollowings, setStateFollowings] = useState('none');


    let userID = ""
    let userRole = "";
    if(user()){
        userID = user()._id;
        userRole = user().role;
    }

    userID = "60ed8d6597a4670ca060ed6b";

    const [statePublicationData, setStatePublicationData] = useState([]);
    const [stateFollowersData, setStateFollowersData] = useState([]);
    const [stateFollowingUsers, setStateFollowingUsers] = useState([]);

    // load articles done by user
    const urlGetPublications = APIURL("dashboard_operation/get_all_publication");
    useEffect(() => {
        axios.post(urlGetPublications, {user_id: userID}).then(function (response) {
            if (response.data)
                setStatePublicationData(response.data);
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
            data.article.upvotes.map(votes=>{
                if (typeof votes.by !== 'undefined')
                    likeCount++;
            })
            viewCount = viewCount + data.viewCount
        }
    });

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
                                        {
                                            statePublicationData.length > 0 ? (
                                                statePublicationData.map(data =>
                                                    data.type !== "pin" ? (
                                                        <Publication title={data.article.current.title}
                                                                     postID={data._id} postData={data}/>
                                                    ) : (
                                                        // console.log(data.pin.originalPost._id)
                                                        <PublicationPin
                                                            title={data.pin.originalPost.article.current.title}
                                                            originalPostID={data.pin.originalPost._id} postID={data._id}
                                                            postData={data}/>
                                                    )
                                                )
                                                // console.log(statePublicationData)
                                            ) : (
                                                <h2 className={classes.emptyResult}>
                                                    No publications belongs to you..<br/>
                                                    <small>Write/publish your thought with EduPulse, using <i>CREATE
                                                        POST</i> option.</small>
                                                </h2>
                                            )
                                        }

                                    </div>
                                    <Grid container spacing={3} style={{display: stateFollowers}}>
                                        {
                                            stateFollowersData.length > 0 ? (
                                                stateFollowersData.map(data => <UserCard userID={data}/>)
                                            ) : (
                                                <h2 className={classes.emptyResult}>
                                                    Others do not fallow you yet.<br/>
                                                    <small>Write/publish good content on the system to have a good
                                                        follower base.</small>
                                                </h2>
                                            )
                                        }
                                    </Grid>

                                    <Grid container spacing={3} style={{display: stateFollowings}}>
                                        {
                                            stateFollowingUsers.length > 0 ? (
                                                stateFollowingUsers.map(data => <UserCard userID={data._id}/>)
                                            ) : (
                                                <h2 className={classes.emptyResult}>
                                                    You are not follow other users yet.<br/>
                                                    <small>Fallow other users to look there valuable content as soon as
                                                        they publish.</small>
                                                </h2>
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
