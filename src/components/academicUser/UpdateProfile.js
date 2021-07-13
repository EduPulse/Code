import React from 'react'

import { Grid, makeStyles, Button, Avatar } from '@material-ui/core';

import AcaNavbar from './acaNavbar'
import ProfileButtonSet from './ProfileButtonSet';
import UpdateProfileForm from './UpdateProfileForm';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '80%',
    },
    cardStyle: {
        marginTop: '300px'
    },
    pubPostInfo: {
        width: '80%',
    },
    postsInfo:{
      width:'100%',
    },
    avatar: {
        backgroundColor:'#935FF9',
    },
    headerInfo: {
        marginTop:'90px',
        marginBottom: '10px',
        marginLeft: '110px',
        width: '100%'
    },
}));

function UpdateProfile() {
    const classes = useStyles();

    return (
        <div>
            <AcaNavbar/>

            <div align= 'center'>
                <div className={classes.root}>
                    <Grid container className={classes.headerInfo} spacing={3} >
                        <Grid item >
                            <Avatar aria-label="recipe" className={ classes.avatar }>N</Avatar>
                        </Grid>
                        
                        <Grid item  >
                            <Button aria-label="recipe" className={ classes.buttonStyle }>Naveen Perera / Edit Profile</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className={ classes.pubPostInfo }>
                        <Grid item xs className={ classes.postsInfo }>
                            <ProfileButtonSet/>
                        </Grid>
                        <Grid item xs={8} className={classes.postsInfo}>
                            <UpdateProfileForm/>
                            {/* <SocialProfileForm/> */}
                            {/* <Customization/> */}
                            {/* <EmailNotification/> */}
                        </Grid>
                    </Grid>
                    
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile
