import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: 379,
        borderRadius:6,
    },
    profilePic: {
        width: 80,
        height: 80,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    actionButton:{
        width:"90%",
        backgroundColor:"#935FF9",
        margin:"auto",
        padding:8,
        color:"#fff",
    },
    bio:{
        fontWeight:530,
    },
    moreInfoTitle:{
        fontWeight:"bold",
        fontSize:15,
        color:"#424040"
    },
    moreInfoValue:{
        fontSize:17,
    }
}));

export default function WriterInfo() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.profilePic}>
                            <Avatar alt="Profile image" className={classes.profilePic} src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    Chathura Wanniarachchi
                                </Typography>
                                <Typography variant="body1" gutterBottom className={classes.bio}>
                                    Computer Science Undergraduate at University of Colombo School of Computing, LK
                                </Typography>
                            </Grid>
                            <Grid item>
                                    <Button variant="contained" disableElevation className={classes.actionButton}>
                                        Follow
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            <span className={classes.moreInfoTitle}>University</span> <br/>
                            <span className={classes.moreInfoValue}>University of Colombo</span><br/>

                            <span className={classes.moreInfoTitle}>Status</span> <br/>
                            <span className={classes.moreInfoValue}>Undergraduate</span><br/>

                            <span className={classes.moreInfoTitle}>Joined</span> <br/>
                            <span className={classes.moreInfoValue}>Jul 11, 2021</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
