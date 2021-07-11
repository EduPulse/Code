import React from 'react'
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Publication from "./publication";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import UserCard from './userCard';

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
        margin:30,
    },
    title:{
        color:"#4411A8",
        fontWeight:"bold",
        paddingBottom:15,
    },
    summary:{
        borderRadius:5,
        padding:10,
        textAlign:"center",
        width:"80%",
        margin:"auto",
    },
    summaryValue:{
        color:"#4411A8",
        fontWeight:"bold",
        padding:10,
    },
    showInfoSection:{
        marginTop:20,
    },
    optionButton:{
        color:"#fff",
        backgroundColor:"#4411A8",
        margin:8,
        padding:10,
        width:"80%",
        borderRadius:5,
        textAlign:"left",
    },
    followers:{
        // display:"none",
    },
    publications:{
        // display:"none",
    },
    fallowingUsers:{
        // display:"none",
    }
}));

export default function AcademicDashboard() {
    const classes = useStyles();
    return (
        <div>
            <AcademicUserGeneralNav className={classes.navBar}/>
            <div className={classes.pageContent}>
                <Grid container spacing={3}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Typography variant="h3" component="h3" className={classes.title}>
                            Dashboard
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <PeopleIcon style={{ fontSize: 45 }} /> &nbsp; 150
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Followers
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <ThumbUpAltIcon style={{ fontSize: 45 }} /> &nbsp; 15.6K
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Total Likes
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.summary}>
                                    <Typography variant="h3" component="h3" className={classes.summaryValue}>
                                        <VisibilityIcon style={{ fontSize: 45 }} /> &nbsp; 34.4K
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
                                    <Button className={classes.optionButton}>Publications</Button><br/>
                                    <Button className={classes.optionButton}>Followers</Button><br/>
                                    <Button className={classes.optionButton}>Fallowing Users</Button>
                                </Grid>
                                <Grid item xs={9}>
                                    <div className={classes.publications}>
                                        <Publication title={"Say hello to Raspberry"} isDraft={true} likeCount={10} commentCount={34} viewCount={455}/>
                                        <Publication title={"First post on EduPulse"} isDraft={false} publishedDate={"2 JUL, 2021"} likeCount={545} commentCount={342} viewCount={3452}/>
                                    </div>
                                    <Grid container spacing={3} className={classes.followers}>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Kamal Gunasekara"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                    </Grid>

                                    <Grid container spacing={3} className={classes.fallowingUsers}>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Kamal Gunasekara"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                        <UserCard name={"Saman Rathnayake"} bio={"Computer Science Undergraduate at" +
                                        " University of Colombo School of Computing, LK"} ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>
    )
}
