import React from 'react'
import AcaNavbar from './acaNavbar';
import { Grid,Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  maingrid:{
    marginTop:'80px',
    width:'80%'
  }
}));

function Home() {
    const classes = useStyles();
    return (
        <div>
            <AcaNavbar/>
            <div align="center">
                <Grid container spacing={3} className={classes.maingrid}>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home
