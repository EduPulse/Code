import React from 'react';
import { Grid, makeStyles, Typography, Button, CardContent, Card, Avatar } from '@material-ui/core';
import UpdateProfile from './UpdateProfile'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor:'#935FF9',
    marginLeft: '450px'
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    color: '#FFFFFF',
    marginLeft: '300px',
    '&:hover': {
      backgroundColor: '#4411A8',
    },
    marginBottom: '20px'
  }
});

function ProfileInfo () {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <CardContent>

        <Grid container spacing={3} >
          <Grid item >
            <Avatar aria-label="recipe" className={classes.avatar}>N</Avatar>
          </Grid>

          <Grid item  >
            <Button aria-label="recipe" className={classes.buttonStyle}  >Edit Profile</Button>
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
  );
}
export default ProfileInfo