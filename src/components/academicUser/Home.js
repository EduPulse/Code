import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Posts from '../posts';
import './../../index.css';

const useStyles = makeStyles((theme) => ({
  maingrid:{
    marginTop:'80px',
    width:'80%',
    marginLeft: 400,
  }
}));

function Home() {
    const classes = useStyles();
    return (
      <div>
        <div align="center">
            <Grid container spacing={3} className={classes.maingrid}>
              <Posts />
              <Posts />
              <Posts />
            </Grid>
        </div>
      </div>
    )
}

export default Home