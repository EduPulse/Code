import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFFFFF',
    },
});

function EmailNotifications() {
  return (
    <Card className={useStyles.root}>
        <FormGroup>
            <FormControlLabel  control={<Checkbox name="checkedC" />} label="Send me weekly newsletter emails" />        
            <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone replies to me in a comment" />
            <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone new follows me" />
            <FormControlLabel control={<Checkbox name="checkedC" />} label="Send me an email when someone mentions me" />
        </FormGroup>
    </Card>
  );
}

export default EmailNotifications