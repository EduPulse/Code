import React, {useEffect, useState} from 'react'
import {makeStyles,} from '@material-ui/core';
import {SocialIcon} from 'react-social-icons';
import axios from 'axios';
import APIURL from "../API/APIURL";

const useStyles = makeStyles({
    root: {
        margin: "auto",
        marginBottom: 10,
        marginTop: 10
    }
})

function ScoailProfilesBar({authorId}) {
    const classes = useStyles();

    const [socialAcc, setsocialAcc] = useState([]);
    const logggedInUserId = authorId;
    const userData = {"_id": logggedInUserId}
    const url_loogedInUser = APIURL("loggedIn_User/get_socialAccounts");
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setsocialAcc(response.data);
            console.log("social accounts: ", socialAcc);
        }).catch(function () {
            console.error("Socila Acconts loading failed");
        })
    }, []);

    return (
        <div className={classes.root}>
            {
                socialAcc.linkedin ? (<SocialIcon url={socialAcc.linkedin} style={{height: 30, width: 30, margin: 10,}}
                                                  bgColor='#4411A8'/>) : (<span/>)
            }
            {
                socialAcc.facebook ? (<SocialIcon url={socialAcc.facebook} style={{height: 30, width: 30, margin: 10,}}
                                                  bgColor='#4411A8'/>) : (<span/>)
            }
            {
                socialAcc.twitter ? (<SocialIcon url={socialAcc.twitter} style={{height: 30, width: 30, margin: 10,}}
                                                 bgColor='#4411A8'/>) : (<span/>)
            }
            {
                socialAcc.github ? (<SocialIcon url={socialAcc.github} style={{height: 30, width: 30, margin: 10,}}
                                                bgColor='#4411A8'/>) : (<span/>)
            }
            {
                socialAcc.personal ? (<SocialIcon url={socialAcc.personal} style={{height: 30, width: 30, margin: 10,}}
                                                  bgColor='#4411A8'/>) : (<span/>)
            }


        </div>
    )
}

export default ScoailProfilesBar
