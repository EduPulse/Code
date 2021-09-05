import React, {useEffect, useState} from 'react';
import AcademicUserGeneralNav from "../navBars/acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserCard from "../subComponents/userCard";
import UniversityListing from "../subComponents/universityListing";
import Grid from "@material-ui/core/Grid";
import PostListing from "../subComponents/postListing";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
import APIURL from "../../API/APIURL";
import Navigationbar from "../../navbar";
import GenNavbar from "../navBars/genNavbar";
import {user} from "../../auth/auth"

const useStyles = makeStyles(() => ({
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
    topOptions: {
        margin: "auto",
        display: "table",
    },
    optionUnit: {
        width: 200,
        padding: 10,
        fontWeight: 550,
    },
    resultSection: {
        margin: "auto",
    },
    sectionItems: {
        margin: "auto",
    },

}))

export default function SearchResult() {
    const classes = useStyles();
    // TODO userID hard corded need to get form session information
    let userLevel = "Anyone";
    let userID = ""
    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
        if (userRole === "academic")
            userLevel = "Academic Only";
    }
    userID = "60ed8d6597a4670ca060ed6b";


    const [statePostDataSR, setStatePostDataSR] = useState([]);
    const [statePeopleData, setStatePeopleData] = useState([]);
    const [stateUniversityData, setStateUniversityData] = useState([]);

    const urlArticle = APIURL("search_operation/post");
    const urlInstitute = APIURL("search_operation/institute");
    const urlPeople = APIURL("search_operation/people");

    const searchKey = decodeURI(window.location.href.split('/').slice(-1)[0]);

    const postInfo = {"search_key": searchKey};

    useEffect(() => {
        axios.post(urlArticle, postInfo).then(function (response) {
            if (response.data)
                setStatePostDataSR(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    useEffect(() => {
        axios.post(urlInstitute, postInfo).then(function (response) {
            setStateUniversityData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    useEffect(() => {
        axios.post(urlPeople, postInfo).then(function (response) {
            setStatePeopleData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);


    let [statePost, setStatePost] = useState(["none", "#000"]);
    let [statePeople, setStatePeople] = useState(["none", "#000"]);
    let [stateUniversity, setStateUniversity] = useState(["none", "#000"]);

    // set active tab based on maximum search result availability
    console.log(statePostDataSR.length, statePeopleData.length, stateUniversityData.length)
    useEffect(() => {
        setStatePost(["none", "#000"])
        setStateUniversity(["none", "#000"])
        setStatePeople(["none", "#000"])

        if (statePostDataSR.length > statePeopleData.length) {
            if (statePostDataSR.length > stateUniversityData.length)
                setStatePost(["flex", "#935FF9"])
            else
                setStateUniversity(["flex", "#935FF9"])
        } else {
            if (statePeopleData.length > stateUniversityData.length)
                setStatePeople(["flex", "#935FF9"])
            else
                setStateUniversity(["flex", "#935FF9"])
        }
    }, [statePostDataSR, statePeopleData, stateUniversityData])

    return (
        <div>
            {userLevel === "" ? (
                // non login user
                <Navigationbar/>
            ) : (
                userLevel === "academic" ? (
                    // academic user
                    <AcademicUserGeneralNav className={classes.navBar}/>
                ) : (
                    // general lodged in user
                    <GenNavbar/>
                )
            )}


            <Grid className={classes.pageContent}>
                <ButtonGroup color="" aria-label="secondary button group" className={classes.topOptions}>
                    <Button className={classes.optionUnit} style={{color: statePost[1]}} onClick={() => {
                        setStatePost(["flex", "#935FF9"]);
                        setStatePeople(["none", "#000"]);
                        setStateUniversity(["none", "#000"]);
                    }}>Posts</Button>
                    <Button className={classes.optionUnit} style={{color: statePeople[1]}} onClick={() => {
                        setStatePost(["none", "#000"]);
                        setStatePeople(["flex", "#935FF9"]);
                        setStateUniversity(["none", "#000"]);

                    }}>People</Button>
                    <Button className={classes.optionUnit} style={{color: stateUniversity[1]}} onClick={() => {
                        setStatePost(["none", "#000"]);
                        setStatePeople(["none", "#000"]);
                        setStateUniversity(["flex", "#935FF9"]);
                    }}>University</Button>
                </ButtonGroup>
            </Grid>

            <Grid container spacing={3} className={classes.resultSection}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <Grid container spacing={3} className={classes.sectionItems} style={{display: statePost[0]}}>

                        {statePostDataSR.length ? (
                            statePostDataSR.map(item => (
                                <PostListing
                                    userID={userID}
                                    postID={item._id}
                                    title={item.article.current.title}
                                    author={item.author.name}
                                    authorID={item.author._id}
                                    authorPP={item.author.profilePicture}
                                    publishedData={item.createdAt}
                                    coverImage={item.article.current.coverImage}
                                    likes={item.article.upvotes}
                                    viewCount={item.viewCount}
                                    readTime={item.article.current.readTime}
                                />
                            ))
                        ) : (
                            <h2 style={{
                                margin: "auto",
                                paddingTop: 80,
                                fontSize: 50,
                                textAlign: "center",
                            }}>
                                <SearchIcon fontSize={"large"}/> Search Not Found for Post Category...<br/>
                                <small>Try Other Sections.</small>
                            </h2>
                        )}

                    </Grid>

                    <Grid container spacing={3} className={classes.sectionItems} style={{display: statePeople[0]}}>

                        {statePeopleData.length ? (
                            statePeopleData.map(item => (
                                <UserCard userID={item._id}/>
                            ))
                        ) : (
                            <h2 style={{
                                margin: "auto",
                                paddingTop: 80,
                                fontSize: 50,
                                textAlign: "center",
                            }}>
                                <SearchIcon fontSize={"large"}/> Search Not Found for People Category...<br/>
                                <small>Try Other Sections.</small>
                            </h2>
                        )}

                    </Grid>

                    <Grid container spacing={3} className={classes.sectionItems} style={{display: stateUniversity[0]}}>

                        {stateUniversityData.length ? (
                            stateUniversityData.map(item => (
                                <UniversityListing name={item.name}
                                                   description={item.description}
                                                   location={item.contactDetails.address.city + "," + item.contactDetails.address.country}
                                                   coverImage={item.coverImage}/>
                            ))
                        ) : (
                            <h2 style={{
                                margin: "auto",
                                paddingTop: 80,
                                fontSize: 50,
                                textAlign: "center",
                            }}>
                                <SearchIcon fontSize={"large"}/> Search Not Found for University Category...<br/>
                                <small>Try Other Sections.</small>
                            </h2>
                        )}

                    </Grid>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        </div>
    )
}
