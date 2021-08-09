import React, {useEffect, useState} from 'react';
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserCard from "./userCard";
import UniversityListing from "./universityListing";
import Grid from "@material-ui/core/Grid";
import PostListing from "./postListing";
import axios from "axios";

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

    const [statePost, setStatePost] = useState('flex');
    const [statePeople, setStatePeople] = useState('none');
    const [stateUniversity, setStateUniversity] = useState('none');

    const [statePostData, setStatePostData] = useState([]);
    const [statePeopleData, setStatePeopleData] = useState([]);
    const [stateUniversityData, setStateUniversityData] = useState([]);

    const urlArticle = "http://localhost:9000/search_operation/post";
    const urlInstitute = "http://localhost:9000/search_operation/institute";
    const urlPeople = "http://localhost:9000/search_operation/people";

    const searchKey = decodeURI(window.location.href.split('/').slice(-1)[0]);

    const postInfo = {"search_key": searchKey};

    useEffect(() => {
        axios.post(urlArticle, postInfo).then(function (response) {
            setStatePostData(response.data);
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

    console.log(statePostData)
    console.log(stateUniversityData)
    console.log(statePeopleData)
    return (
        <div>
            <AcademicUserGeneralNav className={classes.navBar}/>

            <Grid className={classes.pageContent}>

                <ButtonGroup color="" aria-label="secondary button group" className={classes.topOptions}>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("flex");
                        setStatePeople("none");
                        setStateUniversity("none");
                    }}>Posts</Button>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("none");
                        setStatePeople("flex");
                        setStateUniversity("none");
                    }}>People</Button>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("none");
                        setStatePeople("none");
                        setStateUniversity("flex");
                    }}>University</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={3} className={classes.resultSection}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grid container spacing={3} className={classes.sectionItems} style={{display: statePost}}>
                    {/*<h2>post</h2>*/}

                        {
                            statePostData.map(item => (
                            <PostListing postID={item._id}
                                title={item.article.versions[0].title}
                                author={item.author.name}
                                authorPP={item.author.profilePicture}
                                publishedData={item.article.versions[0].updatedAt}
                                coverImage={item.article.versions[0].coverImage}/>
                            ))
                        }


                    </Grid>

                    <Grid container spacing={3} className={classes.sectionItems} style={{display: statePeople}}>
                    {/*<h2>peop</h2>*/}

                        {statePeopleData.map(item => (
                            <UserCard name={item.name}
                                      bio={item.bio}
                                      ppLink={item.profilePicture}/>
                        ))}

                    </Grid>

                    <Grid container spacing={3} className={classes.sectionItems} style={{display: stateUniversity}}>
                            {/*<h2>uni</h2>*/}

                        {stateUniversityData.map(item => (
                            <UniversityListing name={item.name}
                                               description={item.description}
                                               location={item.contactDetails.address.city + "," + item.contactDetails.address.country}
                                               coverImage={item.coverImage}/>

                        ))}

                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

        </div>

    )
}
