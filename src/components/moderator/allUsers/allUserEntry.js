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
import {MailRounded, PersonRounded} from '@material-ui/icons';
import {format} from "date-fns"

import APIURL from "../../API/APIURL";
import Snackbar from '../Snackbar'

import config from '../../../config/config'

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
    const [formOptionAcaRole, setFormOptionAcaRole] = useState(props.user.academic.role);
    const [formOptionRole, setFormOptionRole] = useState(props.user.role);

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
            academic: {
                role: formOptionAcaRole
            },
            role: formOptionRole
        };
        fetch(APIURL('institute/users'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            setFetching(false);
            if (response.ok) {
                // handleViewClose();
                setViewOpen(false);
                setFetching(false);
                if(data.role === 'general') {
                    props.remove(entry._id);
                }
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
                <Link to={config.URIs.user + entry._id}>
                    <Avatar alt={entry.name} src={entry.profilePicture}/>
                </Link>
            </ListItemAvatar>
            <ListItemText
                disableTypography
                style={{display: 'flex', flexDirection: 'column'}}
                primary={
                    <Typography variant="body1">
                        <Link to={config.URIs.user + entry._id} underline="hover">
                            {entry.name}
                        </Link>
                        <span>
                            <Typography variant="caption">
                                {(props.user.role === 'moderator') ? ' • moderator' : ''}
                                &nbsp;•&nbsp;joined&nbsp;{format(new Date(entry.createdAt), "h:mm a, do MMMM yyyy")}
                            </Typography>
                        </span>
                    </Typography>
                }
                secondary={
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Divider orientation="vertical" flexItem style={{marginInline: 10, margin: 5}}/>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="subtitle2" color="textPrimary"
                                        style={{display: 'flex', alignItems: 'center'}}>
                                <MailRounded style={{marginInline: 5, marginBlock: 2}}/>
                                <Tooltip title="Click to open in mail app">
                                    <a href={`mailto: ${entry.academicEmail}`}>{entry.academicEmail}</a>
                                </Tooltip>
                            </Typography>
                            <Typography variant="subtitle2" color="textPrimary"
                                        style={{display: 'flex', alignItems: 'center'}}>
                                <PersonRounded style={{marginInline: 5, marginBlock: 2}}/>
                                <span>{entry.academic.role[0].toUpperCase() + entry.academic.role.substr(1)}</span>
                            </Typography>
                        </div>
                    </div>
                }
            />
            <Dialog open={viewOpen}>
                <DialogTitle>
                    Take Action
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Take an action for this user.
                    </DialogContentText>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <FormControl style={{minWidth: 160, margin: '10px'}}>
                            <InputLabel id={`all-users-${entry._id}-aca-role-label`}>Academic role</InputLabel>
                            <Select
                                labelId={`all-users-${entry._id}-aca-role-label`}
                                id={`all-users-${entry._id}-aca-role-select`}
                                value={formOptionAcaRole}
                                onChange={(event) => setFormOptionAcaRole(event.target.value)}
                                input={<Input/>}
                                disabled={formOptionRole !== 'academic'}
                            >
                                <MenuItem value="undergraduate">Undergraduate</MenuItem>
                                <MenuItem value="staff">Staff</MenuItem>
                                <MenuItem value="lecturer">Lecturer</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{minWidth: 160, margin: '10px'}}>
                            <InputLabel id={`all-users-${entry._id}-role-label`}>User role</InputLabel>
                            <Select
                                labelId={`all-users-${entry._id}-role-label`}
                                id={`all-users-${entry._id}-role-select`}
                                value={formOptionRole}
                                onChange={(event) => setFormOptionRole(event.target.value)}
                                input={<Input/>}
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="academic">Academic</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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
                <Button variant="outlined" disabled={fetching} color="primary" className={classes.button}
                        disabled={props.user.role === 'moderator'}
                        onClick={() => setViewOpen(true)}>Take Action</Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}