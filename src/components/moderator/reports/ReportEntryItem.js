import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {
    Avatar,
    Checkbox,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Tooltip,
    Typography
} from "@material-ui/core";
import {formatDistance} from "date-fns"

import Chip from "./Chip";
import Snackbar from '../Snackbar';
import APIURL from '../../API/APIURL';

import config from '../../../config/config'

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        marginInline: theme.spacing(1),
        width: '100%'
    },
    root: {
        display: "flex",
        flexDirection: "row",
        margin: theme.spacing(1)
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'start',
        padding: theme.spacing(1)
    },
    left: {
        display: "flex",
        paddingInline: theme.spacing(1),
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        textAlign: "left",
        paddingInline: theme.spacing(1),
    },
    inline: {
        display: "inline",
    },
    body: {
        textAlign: "justify"
    },
    chipArray: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "right",
        padding: theme.spacing(0.2)

    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const capitalize = (text) => {
    return text.split(' ').reduce((a, b) => {
        return a + ' ' + b.charAt(0).toUpperCase() + b.slice(1)
    }, '').trim();
}

export default function ReportCard(props) {

    const classes = useStyles();

    const [fetching, setFetching] = useState(false)

    const report = props.report;

    const [alert, setAlert] = useState({
        open: false,
        message: null,
        type: null
    })

    const handleToggle = (event) => {

        setFetching(true);
        const tempStatus = event.target.checked;
        fetch(APIURL('reports'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                _ids: [report._id],
                status: (tempStatus) ? 'in review' : 'open'
            })
        }).then(response => {
            if (response.ok) {
                if (tempStatus === true) {
                    props.review(props.index);
                } else {
                    props.revert(props.index);
                }
                setFetching(false);
            } else {
                throw new Error(`${response.status}, ${response.statusText}`);
            }
        }).catch(error => {
            console.error(error);
            setFetching(false);
            setAlert({
                open: true,
                message: error.toString(),
                type: 'error'
            });
        })
    }

    return (
        <ListItem button divider selected={props.isEntryItemSelected(props.index)} alignItems="flex-start"
                  onClick={() => props.setEntryItemSelected(props.index)}>
            <ListItemAvatar style={{alignContent: 'center'}}>
                <Link to={config.URIs.user + report.reportedBy._id}>
                    <Avatar alt={report.reportedBy.name} src={report.reportedBy.profilePicture}/>
                </Link>
            </ListItemAvatar>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <ListItemText disableTypography
                              primary={
                                  <Typography variant="caption">
                                      <Link to={config.URIs.user + report.reportedBy._id} underline="hover">
                                          {report.reportedBy.name}
                                      </Link>
                                      &nbsp;•&nbsp;{report.reportedBy.role}
                                      &nbsp;•&nbsp;{formatDistance(new Date(report.createdAt), new Date(), {addSuffix: true})}
                                  </Typography>
                              }
                              secondary={
                                  <Typography variant="subtitle2" className={classes.body}>
                                      <b>{report.title}</b>
                                      {` - ${report.message.slice(0, 50)}${(report.message.length > 100 ? '...' : '')}`}
                                  </Typography>
                              }
                />
                <div component='ul' className={classes.chipArray}>
                    {
                        (report.status === 'open') ? Chip('Open', 'open')
                            : (report.status === 'in review') ? Chip('In Review', 'in-review')
                                : Chip('Closed', 'closed')
                    }
                    {Chip('Category: ' + capitalize(report.category))}
                </div>
            </div>
            <Snackbar open={alert.open} message={alert.message} type={alert.type} close={() => {
                const tempAlert = alert;
                tempAlert.open = false;
                setAlert({...tempAlert});
            }}/>
            <ListItemSecondaryAction>
                <Tooltip title="Mark for review">
                    <Checkbox
                        edge="end"
                        onChange={handleToggle}
                        color="primary"
                        indeterminate={fetching}
                        disabled={fetching}
                        checked={report.checked}
                    />
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );

}