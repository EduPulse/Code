import React from 'react'
import {Grid, makeStyles} from "@material-ui/core";
import Tags from "../tags";
import Posts from "../posts";
import AcademicUserGeneralNav from "./acaNavbar";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid:{
        marginTop:'80px',
        width:'80%'
    },
}));

export default function AcademicHome() {
    const classes = useStyles();
    return (
            <div align="center">
                <Grid container spacing={3} className={classes.mainGrid}>

                    <Grid item xs>
                        <h3>Trending Tags</h3>
                        <Tags/>
                    </Grid>

                    <Grid item xs={6}>
                        <Link to="/components/academicUser/viewArticle" style={{textDecoration:"none"}}>
                            <Posts/>
                        </Link>
                        <Link to="/components/academicUser/viewArticle" style={{textDecoration:"none"}}>
                            <Posts/>
                        </Link>
                    </Grid>

                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
    )
}
