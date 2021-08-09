import React, {useState} from 'react'
import ModNavbar from "./modNavbar";
import {makeStyles} from "@material-ui/core/styles";
import {Card, Paper} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostListing from "../academicUser/postListing";

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
    topHeader: {
        flexGrow: 1,
        width: "80%",
        margin: "auto",
        borderRadius: 10,
    },
    media: {
        height: 310,
    },
    summary: {
        borderRadius: 10,
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
        borderRadius: 10,
        textAlign: "left",
    },
    contentLoadingArea: {
        width: "95%",
        padding: 10,
        marginTop: 8,
    },
    sectionItems:{
        margin:"auto",
    }
}));

export default function UniversityProfile() {
    const classes = useStyles();
    return (
        <div>
            <ModNavbar className={classes.navBar}/>
            <div className={classes.pageContent}>

                <Card className={classes.topHeader}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h4" style={{textAlign: "center"}}>
                                University of Colombo School of Computing
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Grid container spacing={3} style={{marginTop: 20,}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        15.5K
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Users
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        102
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Pending Users
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        54.4K
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Views
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                                <Grid container spacing={3} className={classes.showInfoSection}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3} className={classes.sectionItems}>
                                            <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                                         authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                                         publishedData={"Jul 7," + " 2021"}
                                                         coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                                            <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                                         authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                                         publishedData={"Jul 7," + " 2021"}
                                                         coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                                            <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                                         authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                                         publishedData={"Jul 7," + " 2021"}
                                                         coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                                            <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                                         authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                                         publishedData={"Jul 7," + " 2021"}
                                                         coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                                        </Grid>
                                    </Grid>
                                    </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
