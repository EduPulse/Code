import React from "react";
import {Avatar, Card, Link, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {formatDistance} from "date-fns";
import Chip from "./Chip";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 'fit-content',
        maxWidth: '70%',
        margin: theme.spacing(1)
    }
}));

const capitalize = (text) => {
    return text.split(' ').reduce((a, b) => {
        return a + ' ' + b.charAt(0).toUpperCase() + b.slice(1)
    }, '').trim();
}

export default function ReportSingleView(props) {

    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.card}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar style={{alignContent: 'center'}}>
                    <Link href={`/users/${props.report.reportedBy._id}`}>
                        <Avatar alt={props.report.reportedBy.name} src={props.report.reportedBy.profilePicture}/>
                    </Link>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText disableTypography
                                  primary={
                                      <Typography variant="caption">
                                          <Link href={`/users/${props.report.reportedBy._id}`}>
                                              <u>{props.report.reportedBy.name}</u>
                                          </Link>
                                          &nbsp;reported
                                          &nbsp;•&nbsp;{props.report.reportedBy.role}
                                          &nbsp;•&nbsp;{formatDistance(new Date(props.report.createdAt), new Date(), {addSuffix: true})}
                                      </Typography>
                                  }
                                  secondary={
                                      <>
                                          <Typography variant="subtitle2" className={classes.body}>
                                              <b>{props.report.title}</b>
                                          </Typography>
                                          <Typography variant="subtitle2" className={classes.body}>
                                              {props.report.message}
                                          </Typography>
                                          <Typography variant="subtitle2" className={classes.body}>
                                              <i><br/>
                                                  <b>Moderator Comment: </b>
                                                  {props.report.comment}
                                              </i>
                                          </Typography>
                                      </>
                                  }
                    />
                    <div component='ul' className={classes.chipArray}>
                        {/* {(report.status === 'open') ? Chip('Open', 'open') : Chip('In Review', 'in-review')} */}
                        {/* {
                        (props.report.status === 'open') ? Chip('Open', 'open') 
                        : (props.report.status === 'in review') ? Chip('In Review', 'in-review')
                        : Chip('Closed', 'closed')
                    } */}
                        {Chip('Category: ' + capitalize(props.report.category))}
                    </div>
                </div>
            </ListItem>
        </Card>
    )
}