import React from 'react';
import {Avatar, Button, Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        // minWidth: 1000,
        // width: '100%',
    },
    avatar: {
        backgroundColor: '#935FF9',
        // marginLeft: '450px'
        marginBottom: '20px',
        width: 80,
        height: 80,
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        marginLeft: '300px',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '20px'
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    }
});

function ProfileInfo() {
    return (
        // <Router>
        //   <div className="App">
        //     <Switch>
        //       <Route path="/components/generalUser/PublisherProfile" exact component={ProfileInfoCard}/>
        //       <Route path="/components/generalUser/UpdateProfile" component={UpdateProfile}/>
        //     </Switch>
        //   </div>
        // </Router>
        <div>
            <Card className={useStyles().root}>

                <CardContent>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            {/* <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar> */}
                            <Avatar alt="Profile image" className={useStyles().avatar}
                                    src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"/>
                        </Grid>

                        <Grid item>
                            {/* <Button aria-label="recipe" className={useStyles().buttonStyle}  >
                <Link className={useStyles().linkStyles} to="/components/generalUser/UpdateProfile">
                  Edit Profile
                </Link>
              </Button> */}
                        </Grid>
                    </Grid>

                    <Typography gutterBottom variant="h5" component="h2">
                        Chathura Wanniarachchi
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <p>Undergraduate at University of Colombo</p>
                        University of Colombo School of Computing
                    </Typography>

                </CardContent>
            </Card>
        </div>
    );
}

const ProfileInfoCard = () => (
    <div>
        <Card className={useStyles().root}>

            <CardContent>

                <Grid container spacing={3}>
                    <Grid item>
                        <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
                    </Grid>

                    <Grid item>
                        <Button aria-label="recipe" className={useStyles().buttonStyle}>
                            <Link className={useStyles().linkStyles} to="/components/generalUser/UpdateProfile">
                                Edit Profile
                            </Link>
                        </Button>
                    </Grid>
                </Grid>

                <Typography gutterBottom variant="h5" component="h2">
                    Naveen Perera
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>An undergraduate of UOC</p>
                    <p>Faculty of Science</p>
                </Typography>

            </CardContent>
        </Card>
    </div>
);

export default ProfileInfo