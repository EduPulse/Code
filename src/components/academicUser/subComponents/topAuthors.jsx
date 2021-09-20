import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import APIURL from "../../API/APIURL";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // width: "80%",
        borderRadius: 6,
    },
    profilePic: {
        width: 60,
        height: 60,
    },
    userEntry: {
        padding: 5,
        border: "1px solid #80808026",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5
    }
}));

export default function TopAuthors({}) {

    const classes = useStyles();

    let [statePlaces, setStatePlaces] = useState([]);

    // load all tags
    useEffect(() => {
        axios.get(APIURL("get_top_authors/")).then(function (response) {
            setStatePlaces(response.data)
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} style={{backgroundColor: "transparent"}}>
                <Typography variant="h5" color="primary" component="h5" style={{fontWeight: 600, textAlign: "center"}}>
                    Top Authors
                </Typography>
                {
                    statePlaces.length > 0 ? (
                        statePlaces.map(place =>
                            <Grid container spacing={2} className={classes.userEntry}>
                                <Grid item>
                                    <ButtonBase className={classes.profilePic}>
                                        <Avatar alt="Profile image" className={classes.profilePic}
                                                src={place.profile_picture} sx={{width: 56, height: 56}}/>
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs style={{textAlign: "left"}}>
                                            <Typography gutterBottom variant="h5"
                                                        style={{overflow: "hidden", marginBottom: 2}}>
                                                <Link href={"/components/academicUser/authorProfile/" + place.author_id}
                                                      style={{textDecoration: "none"}}>
                                                    {place.author_name}
                                                </Link>
                                            </Typography>
                                            <span style={{margin: "auto"}}>
                                                {place.number_of_posts} Posts/Publications
                                                </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    ) : (
                        <div>
                            {[1, 2, 3].map(data =>
                                <CardHeader
                                    avatar={
                                        <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                                    }
                                    title={
                                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                                    }
                                    subheader={<Skeleton animation="wave" height={10} width="40%"/>}
                                />
                            )}
                        </div>
                    )
                }
            </Paper>
        </div>
    );
}
