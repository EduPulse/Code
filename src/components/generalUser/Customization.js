import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Avatar, Button, makeStyles, Typography, CardContent, Card, } from '@material-ui/core';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import ProfileButtonSet from './profileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';
import EmailNotifications from './EmailNotifications';

const useStyles = makeStyles((theme) => ({
    root: {
        Width: 1800,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginLeft: '50px'
    },
    nightCard: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
    },
    dayCard: {
        backgroundColor: '#FFFFFF',
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    },
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#DFDAE8',
    },
    pubPostInfo: {
        width: '80%',
    },
    postsInfo: {
        width: '100%',
    },
    avatar: {
        backgroundColor: '#935FF9',
    },
    headerInfo: {
        marginTop: '90px',
        marginBottom: '10px',
        marginLeft: '110px',
        width: '100%'
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '80%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px'
    },
}));

function Customization() {
    return (
        <div>
            {/* <Grid container spacing={2} className={ useStyles().pubPostInfo }>
                        <Grid item xs={8} className={useStyles().postsInfo}> */}
            <Card className={useStyles().cardStyle}>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2" align="left">Site Theme</Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={5} >
                            <Card className={useStyles().nightCard}>
                                <Typography gutterBottom variant="h5" component="h3">Night Theme</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={5} >
                            <Card className={useStyles().dayCard}>
                                <Typography gutterBottom variant="h5" component="h3">Day Theme</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* </Grid>
                    </Grid> */}
        </div>
    );
}

export default Customization