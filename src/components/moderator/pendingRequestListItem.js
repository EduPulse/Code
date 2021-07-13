import React from 'react'
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:10,
        margin:"auto",
        marginTop:7,
    },
}));
export default function PendingRequestListItem({name,universityEmail}) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="h6" component="h6">
                            Name: <span>{name}</span><br/>
                            University Email: <span>{universityEmail}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{marginTop:10}}>
                            <Button variant="contained" style={{backgroundColor:"#4411A8",color:"#fff"}}>Accept</Button>
                            &nbsp;
                            <Button variant="contained" style={{backgroundColor:"#656262",color:"#fff"}}>Reject</Button>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
