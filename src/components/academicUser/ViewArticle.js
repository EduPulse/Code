import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Article from "./Article";
import UserInfo from "./WriterInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Link } from 'react-router-dom';

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
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    }
}));

export default function ViewArticle() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.pageContent}>
                <Grid container spacing={3}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} className={classes.article}>
                        <Article customWidth={"110%"} />

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button className={classes.downloadButton}><CloudDownloadIcon /> &nbsp; Download Content
                                    as PDF</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <img className={classes.ccImage}
                                    src={'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png'} />
                            </Grid>
                        </Grid>

                        <div>
                            comment section
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Link className={useStyles().linkStyles} to="/components/academiclUser/PublisherProfile">
                            <UserInfo className={classes.userInfo} />
                        </Link>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>

    )
}