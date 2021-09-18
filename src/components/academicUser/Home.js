import React from 'react'
import {Grid, makeStyles} from '@material-ui/core';
import './../../index.css';

const useStyles = makeStyles((theme) => ({
    maingrid: {
        marginTop: '80px',
        width: '80%',
        marginLeft: 200,
    }
}));

function Home() {
    const classes = useStyles();
    return (
        <div>
            <div align="center">
                <Grid container spacing={3} className={classes.maingrid}>
                    <h4>WELCOME TO ACADEMIC USER HOME PAGE</h4>
                </Grid>
            </div>
        </div>
    )
}

export default Home