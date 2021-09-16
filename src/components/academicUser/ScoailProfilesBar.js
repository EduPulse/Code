import React, { useState, useEffect } from 'react'
import {Avatar, Card, CardContent, Grid, TextField, makeStyles, Typography, Button, } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        // alignContent: 'center'
        // width: '50%',
        // margin: 0 
        // justifyContent: 'center'
        marginLeft: '37%',
        marginBottom: 10
    }
})

function ScoailProfilesBar() {
    const classes = useStyles();

    const [socialAcc, setsocialAcc] = useState([]);
    const logggedInUserId = "60ecfe51395a1704a42d8cae";
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = "http://localhost:9000/loggedIn_User/get_socialAccounts";
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setsocialAcc(response.data);
            console.log("social accounts: ",socialAcc);
        }).catch(function () {
        console.error("Socila Acconts loading failed");
        })
    }, []);

    return (
        <div className={classes.root} >
            <SocialIcon url={socialAcc.linkedin} style={{ height: 30, width: 30, margin: 10, }} bgColor= '#4411A8' />
            <SocialIcon url={socialAcc.facebook} style={{ height: 30, width: 30, margin: 10,  }} bgColor= '#4411A8' />
            <SocialIcon url={socialAcc.twitter} style={{ height: 30, width: 30, margin: 10,  }} bgColor= '#4411A8' />
            <SocialIcon url={socialAcc.github} style={{ height: 30, width: 30, margin: 10,  }} bgColor= '#4411A8' />
            <SocialIcon url={socialAcc.personal} style={{ height: 30, width: 30, margin: 10,  }} bgColor= '#4411A8' />
        </div>
    )
}

export default ScoailProfilesBar
