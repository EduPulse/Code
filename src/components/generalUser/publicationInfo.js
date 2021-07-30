import React from 'react';
import { makeStyles, Typography,  CardContent, Card, } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            <br/>
            <p>20 publications</p>
            <p>10 tags following</p>
            <p>23 followers</p>
            </Typography>
        </CardContent>
    </Card>
  );
}
