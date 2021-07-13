import React from 'react'
import AcademicUserGeneralNav from "./acaNavbar";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";
import UserInfo from "./writerInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";

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
    },
    article: {
        width: "50%",
    },
    userInfo: {
        left: 0,
    },
    ccImage: {
        width: 100,
        display: "block",
        paddingTop: 20,
        float: "right",
        paddingRight: -80,
    },
    downloadButton: {
        padding: 8,
        color: "#fff",
        borderRadius: 5,
        display: "block",
        marginTop: 20,
        float: "left",
        backgroundColor: "#935FF9",
    }
}));

export default function ViewArticle() {
    const classes = useStyles();
    return (
        <div>
            <AcademicUserGeneralNav className={classes.navBar}/>
            <div className={classes.pageContent}>
                <Grid container spacing={3}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} className={classes.article}>
                        <Article customWidth={"100%"}/>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>

                                <Grid container spacing={3} style={{marginTop:5}}>
                                    <Grid item xs={3}>
                                        <Button>
                                            <ThumbUpIcon fontSize={"large"}/>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button>
                                            <ThumbDownIcon fontSize={"large"}/>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button>
                                            <ShareIcon fontSize={"large"}/>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button>
                                            <CloudDownloadIcon fontSize={"large"}/>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <img className={classes.ccImage}
                                     src={'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png'}/>
                            </Grid>

                            <Paper style={{width:"100%",padding:15,}}>
                                <Typography variant={"h4"} component={"h4"}>Comments...</Typography>
                            </Paper>
                        </Grid>

                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}>

                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <UserInfo name={"Chathura Wanniarachchi"} bio={"Computer Science Undergraduate at University of Colombo School of Computing, LK"} profileURL={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"} className={classes.userInfo}/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>

    )
}
