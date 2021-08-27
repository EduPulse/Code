import React, { useState } from 'react'
import { Grid, makeStyles, Button, } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    buttonStyleSubmit: {
      backgroundColor: '#4411A8',
      color: '#FFFFFF',
      paddingLeft: '20px',
      textAlign: 'center',
      width: '150px',
      '&:hover': {
        backgroundColor: '#935FF9',
      },
      marginBottom: '20px',
      marginTop: '30px'
    },
    buttonStyleCancel: {
      backgroundColor: '#FA2C2C',
      color: '#FFFFFF',
      marginLeft: '20px',
      width: '150px',
      '&:hover': {
        backgroundColor: '#A50000',
      },
      marginBottom: '20px',
      marginTop: '30px'
    },
}));

function FollowingTags({ userID, curTags, allTags }) {
    const classes = useStyles();

    const [checked, setChecked] = useState([0]);

    const tags = ["Cpp", "Java", "UI/UX", "React", "front end web development"];

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    const curTagsList = curTags.map((tag) =>
        <ListItem button >
            <ListItemText primary={ tag.type } />
        </ListItem>
    );

    const tagsList = tags.map((tag) =>
        <ListItem key={tag} role={undefined} dense button onClick={handleToggle(tag)} >
            <Checkbox
                edge="start"
                checked={checked.indexOf(tag) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': tag }}
            />
            <ListItemText id={tag} primary={ tag } />
        </ListItem>
    );

    return (
        <div className={classes.root}>
            <form>
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <h3>Already following</h3>
                        <List component="nav" aria-label="main mailbox folders">
                            { curTagsList }
                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <h3>Try following these</h3>
                        <List component="nav" aria-label="main mailbox folders">
                            { tagsList }
                        </List>
                    </Grid>
                    <Grid item xs={6} >
                        <Button className={classes.buttonStyleSubmit} >Follow</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button className={classes.buttonStyleCancel} >Exit</Button>
                    </Grid>
                </Grid>
            </form>
            
        </div>
    ); 
}

export default FollowingTags
