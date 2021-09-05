import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Tooltip,
    Typography
} from "@material-ui/core";
import {MailRounded} from '@material-ui/icons/';
import {format} from "date-fns"

import APIURL from "../../API/APIURL";
import Snackbar from '../Snackbar'

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        margin: theme.spacing(.5),
        width: '100%'
    },
    root: {
        display: "flex",
        flexDirection: "row",
        padding: theme.spacing(1)
    },
    left: {
        display: "flex",
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        textAlign: "left",
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
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
    button: {
        margin: theme.spacing(1)
    }
}));

export default function PendingUserEntry(props) {

    const classes = useStyles();

    const entry = props.user;

    const selectThisEntry = () => {
        props.select(entry._id);
    };

    const [fetching, setFetching] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [formOption, setFormOption] = useState('undergraduate');

    const [alert, setAlert] = useState({
        open: false,
        message: null,
        type: null
    })

    const submit = (event) => {
        event.preventDefault();
        setFetching(true);
        const data = {
            _id: entry._id,
            state: 'academic',
            role: formOption
        };
        fetch(APIURL('pending-users'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            setFetching(false);
            if (response.ok) {
                // handleViewClose();
                setViewOpen(false);
                setFetching(false);
                props.remove(entry._id);
            } else {
                throw new Error(`${response.status}, ${response.statusText}`);
            }
        }).catch(error => {
            setFetching(false);
            setAlert({
                open: true,
                message: error.toString(),
                type: 'error'
            });
        })
    }

    const reject = (event) => {
        event.preventDefault();
        setFetching(true);
        const data = {
            _id: entry._id,
            state: 'none',
        };
        fetch(APIURL('pending-users'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            setFetching(false);
            if (response.ok) {
                // handleViewClose();
                setFetching(false);
                props.remove(entry._id);
            } else {
                throw new Error(`${response.status}, ${response.statusText}`);
            }
        }).catch(error => {
            setFetching(false);
            setAlert({
                open: true,
                message: error.toString(),
                type: 'error'
            });
        })
    }

    return (
        <ListItem divider alignItems="flex-start" onClick={selectThisEntry}>
            <ListItemAvatar style={{alignContent: 'center'}}>
                <Link to={`/users/${entry._id}`}>
                    <Avatar alt={entry.name} src={entry.profilePicture}/>
                </Link>
            </ListItemAvatar>
            <ListItemText
                disableTypography
                style={{display: 'flex', flexDirection: 'column'}}
                primary={
                    <Typography variant="body1">
                        <Link to={`/users/${entry._id}`} underline="hover">
                            {entry.name}
                        </Link>
                        <span>
                            <Typography variant="caption">
                                &nbsp;•&nbsp;joined&nbsp;{format(new Date(entry.createdAt), "h:mm a, do MMMM yyyy")}
                            </Typography>
                        </span>
                    </Typography>
                }
                secondary={
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Divider orientation="vertical" flexItem style={{marginInline: 10, margin: 5}}/>
                        <Typography variant="subtitle2" color="textPrimary"
                                    style={{display: 'flex', alignItems: 'center'}}>
                            <MailRounded style={{marginInline: 5, marginBlock: 2}}/>
                            <Tooltip title="Click to open in mail app">
                                <a href={`mailto: ${entry.academicEmail}`}>{entry.academicEmail}</a>
                            </Tooltip>
                        </Typography>
                    </div>
                }
            />
            <Dialog open={viewOpen}>
                <DialogTitle>
                    Select academic role
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select acadamic role to assign to this user.
                    </DialogContentText>
                    <FormControl required style={{minWidth: 160}}>
                        <InputLabel id={`pending-users-${entry._id}-form-label`}>Academic role</InputLabel>
                        <Select
                            labelId={`pending-users-${entry._id}-form-label`}
                            id={`pending-users-${entry._id}-form-select`}
                            value={formOption}
                            onChange={(event) => setFormOption(event.target.value)}
                            input={<Input/>}
                        >
                            <MenuItem value="undergraduate">Undergraduate</MenuItem>
                            <MenuItem value="staff">Staff</MenuItem>
                            <MenuItem value="lecturer">Lecturer</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" className={classes.button} onClick={() => setViewOpen(false)}>Cancel</Button>
                    <Button variant="text" color="primary" className={classes.button} onClick={submit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alert.open} message={alert.message} type={alert.type} close={() => {
                const tempAlert = alert;
                tempAlert.open = false;
                setAlert({...tempAlert});
            }}/>
            <ListItemSecondaryAction>
                <Button variant="outlined" disabled={fetching} onClick={reject}
                        className={classes.button}>Reject</Button>
                <Button variant="contained" disabled={fetching} color="primary" className={classes.button}
                        onClick={() => setViewOpen(true)}>Accept</Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}