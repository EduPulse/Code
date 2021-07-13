import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    Width: 1800,
    borderRadius: '10px',
    padding: '10px 10px 10px 0px'
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    width: '80%',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#4411A8',
    },
    marginBottom: '10px'
  }
});

function ProfileButtonSet () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button aria-label="recipe" className={classes.buttonStyle}>Update Profile</Button>
        <Button aria-label="recipe" className={classes.buttonStyle}>Social Profiles</Button>
        <Button aria-label="recipe" className={classes.buttonStyle}>Customization</Button>
        <Button aria-label="recipe" className={classes.buttonStyle}>Email Notifications</Button>
    </div>
  );
}
export default ProfileButtonSet