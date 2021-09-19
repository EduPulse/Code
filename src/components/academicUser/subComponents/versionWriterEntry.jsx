import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from "@material-ui/core/Avatar";
import {Chip, Link} from "@material-ui/core";
import axios from "axios";
import APIURL from "../../API/APIURL";

const useStyles = makeStyles((theme) => ({
    profilePic: {
        width: 50,
        height: 50,
    },
    userEntry: {
        padding: 10
    }
}));

export default function VersionWriterEntry({authorIndex, totalVersions, userID, postID}) {

    const classes = useStyles();
    let [stateDisplayEntry, setStateDisplayEntry] = useState({});

    let urlUserInfo = APIURL("get_user_data/");
    useEffect(() => {
        axios.post(urlUserInfo, {"_id": userID}).then(function (response) {
            if (response.data) {
                setStateDisplayEntry({
                    userID: userID,
                    userName: response.data[0].name,
                    ppLink: response.data[0].profilePicture
                })
            }
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    return (

        <Grid container spacing={2} className={classes.userEntry}>
            <Grid item>
                <ButtonBase className={classes.profilePic}>
                    <Avatar alt="Profile image" className={classes.profilePic} src={stateDisplayEntry.ppLink}/>
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs style={{textAlign: "left"}}>
                                            <span style={{margin: "auto"}}>
                                                <Link
                                                    href={"/components/academicUser/viewArticle/" + postID + "?version=" + (authorIndex - 1)}
                                                    style={{textDecoration: "none"}}>
                                                        Version {authorIndex}

                                                    {
                                                        authorIndex === totalVersions ? (
                                                            <Chip
                                                                label="Latest"
                                                                style={{margin: 5}}
                                                                color="primary"/>
                                                        ) : (
                                                            <span/>
                                                        )
                                                    }

                                                    </Link>
                                                </span>

                        <Typography gutterBottom variant="h5" style={{overflow: "hidden"}}>
                            <Link href={"/components/academicUser/authorProfile/" + stateDisplayEntry.userID}
                                  style={{textDecoration: "none"}}>
                                {stateDisplayEntry.userName}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
