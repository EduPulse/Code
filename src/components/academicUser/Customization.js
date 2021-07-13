import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, makeStyles, Typography, CardContent, Card, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        Width: 1800,
    },
    avatar: {
        backgroundColor:'#935FF9',
        marginLeft: '50px'
    },
    nightCard: {
        backgroundColor: '#4411A8',
        font: '#FFFFFF',
    },
    dayCard: {
        backgroundColor: '#FFFFFF',
    },
}));

function Customization() {
    const classes = useStyles();

    return (
        <div className={classes.root} align='center'>
            <Card >
                <CardContent className={classes.cardStyle}>
                    <Typography gutterBottom variant="h5" component="h2">Site Theme</Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={5} >
                            <Card className={classes.nightCard}>
                                <Typography gutterBottom variant="h5" component="h5">Night Theme</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={5} >
                            <Card className={classes.dayCard}>
                                <Typography  gutterBottom variant="h5" component="h5">Day Theme</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default Customization