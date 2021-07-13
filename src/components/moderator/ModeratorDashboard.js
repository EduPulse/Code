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
import PendingRequestListItem from "./pendingRequestListItem";
import ReviewPostListItem from "./reviewPostListItem";

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
        width: "50%",
        margin: "auto",
        borderRadius: 10,
    },
    media: {
        height: 310,
        width: 1200,
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
    }
}));

export default function ModeratorDashboard() {
    const [statePendingRequest, setStatePendingRequest] = useState('block');
    const [statePostReport, setStatePostReport] = useState('none');
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
                                University of Colombo Status Dashboard
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
                                        150
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Users
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        15.6K
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Pending Users
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        34.4K
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
                                        setStatePendingRequest("block");
                                        setStatePostReport("none")
                                    }}>Pending Users</Button><br/>
                                    <Button className={classes.optionButton} onClick={() => {
                                        setStatePostReport("block");
                                        setStatePendingRequest("none")
                                    }}>Post Reports</Button><br/>
                                </Grid>
                                <Grid item xs={9}>
                                    <Card className={classes.contentLoadingArea}>
                                        <div style={{display: statePendingRequest}}>
                                            <PendingRequestListItem name={"Samanth Kumara"}
                                                                    universityEmail={"1934ls123@stu.ucsc.cmb.ac.lk"}/>
                                            <PendingRequestListItem name={"Samanth Kumara"}
                                                                    universityEmail={"1934ls123@stu.ucsc.cmb.ac.lk"}/>
                                            <PendingRequestListItem name={"Samanth Kumara"}
                                                                    universityEmail={"1934ls123@stu.ucsc.cmb.ac.lk"}/>
                                            <PendingRequestListItem name={"Samanth Kumara"}
                                                                    universityEmail={"1934ls123@stu.ucsc.cmb.ac.lk"}/>
                                        </div>

                                        <div style={{display: statePostReport}}>
                                            <ReviewPostListItem postID={12222} creator={234354} reportCount={45}
                                                                type={"Article"}/>
                                            <ReviewPostListItem postID={12222} creator={234354} reportCount={45}
                                                                type={"Article"}/>
                                            <ReviewPostListItem postID={12222} creator={234354} reportCount={45}
                                                                type={"Article"}/>
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
