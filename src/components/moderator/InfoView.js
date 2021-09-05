import {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {
    BusinessRounded,
    EditRounded,
    EmailRounded,
    LanguageRounded,
    MailOutline,
    PhoneRounded
} from '@material-ui/icons';
import {Skeleton} from '@material-ui/lab';

import Snackbar from "./Snackbar";
import APIURL from "../API/APIURL";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    m1: {
        margin: theme.spacing(1)
    },
    m2: {
        margin: theme.spacing(2)
    },
    body: {
        marginInline: theme.spacing(2),
        marginBlock: theme.spacing(1),
    },
    bodyText: {
        marginInline: theme.spacing(2),
        marginBlock: theme.spacing(1),
        width: '100%',
    },
    contactContainer: {
        marginInline: theme.spacing(2),
        marginBlock: theme.spacing(1),
        width: '90%',
        justifyContent: 'center',
    },
    contact: {
        width: '100%',
        display: 'flex',
        alignItems: 'start'
    },
    contactContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    statContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginInline: theme.spacing(1),
    },
    inputSmall: {
        width: '40ch'
    },
    inputSmallIntended: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(5),
        width: '40ch'
    },
    cover: {
        marginInline: theme.spacing(1),
        '&:hover': {
            zIndex: 1,
            '& $coverBackdrop': {
                opacity: 0.15,
            },
            '& $coverIcon': {
                opacity: 1,
            },
        }
    },
    coverBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    coverIcon: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        opacity: 0.4,
        height: '25%',
        width: 'auto',
        transition: theme.transitions.create('opacity'),
    },
}));

export default function InfoView(props) {

    const classes = useStyles();

    const [fetching, setFetching] = useState(true);
    const [info, setInfo] = useState({});
    const [alert, setAlert] = useState({
        open: false,
        message: null,
        type: null
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        reFetch()
    }, [fetching]);

    const UpdateView = (props) => {

        const [formName, setFormName] = useState(props.data.name);
        const [formDesc, setFormDesc] = useState(props.data.description);
        const [formDomain, setFormDomain] = useState(props.data.domain);
        const [formContactEmail, setFormContactEmail] = useState(props.data.contactDetails.email);
        const [formContactPhones, setFormContactPhones] = useState(props.data.contactDetails.phoneNos);
        const [formContactAddress, setFormContactAddress] = useState(props.data.contactDetails.address);
        const [formCover, setFormCover] = useState(props.data.coverImage);

        const [updating, setUpdating] = useState(false);

        const [alert2, setAlert2] = useState({
            open: false,
            message: null,
            type: null
        });

        const submit = () => {
            let data = {
                _id: props.data._id,
                name: formName,
                domain: formDomain,
                description: formDesc,
                coverImage: formCover,
                contactDetails: {
                    email: formContactEmail,
                    phoneNos: formContactPhones,
                    address: formContactAddress
                }
            };

            setUpdating(true);

            fetch(APIURL('institute'), {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error(`${response.status}, ${response.statusText}`);
                    setUpdating(false);

                    // update info
                    const tempInfo = info;
                    tempInfo.name = data.name;
                    tempInfo.domain = data.domain;
                    tempInfo.description = data.description;
                    tempInfo.coverImage = data.coverImage;
                    tempInfo.contactDetails = data.contactDetails;
                    setInfo({...tempInfo});
                    setOpen(false);
                })
                .catch(error => {
                    console.error(error);
                    setUpdating(false);
                    setAlert2({
                        open: true,
                        message: error.toString(),
                        type: 'error'
                    });
                });
        }

        return (
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>
                    Update Institute Details
                </DialogTitle>
                <DialogContent dividers={true}>
                    <ButtonBase
                        focusRipple
                        style={{height: '20vh', width: '100%', overflow: 'hidden'}}
                        className={classes.cover}
                    >
                        <img src={formCover} style={{height: 'auto', maxWidth: '100%'}}/>
                        <span className={classes.coverBackdrop}/>
                        <EditRounded className={classes.coverIcon}/>
                    </ButtonBase>
                    <form>
                        <FormControl style={{width: '100%'}}>
                            <TextField
                                id="info-update-title"
                                label="Name"
                                type="text"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                className={classes.input}
                                defaultValue={formName}
                                onChange={(event) => setFormName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl style={{width: '100%'}}>
                            <TextField
                                id="info-update-desc"
                                label="Description"
                                type="text"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                className={classes.input}
                                defaultValue={formDesc}
                                onChange={(event) => setFormDesc(event.target.value)}
                                minRows={1}
                                multiline
                            />
                        </FormControl>
                        <FormControl>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.input}>
                                <Grid item>
                                    <LanguageRounded/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="info-update-domain"
                                        label="Website"
                                        type="url"
                                        variant="standard"
                                        className={classes.inputSmall}
                                        margin="normal"
                                        defaultValue={formDomain}
                                        onChange={(event) => setFormDomain(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <FormControl>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.input}>
                                <Grid item>
                                    <EmailRounded/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="info-update-email"
                                        label="Email"
                                        type="email"
                                        variant="standard"
                                        className={classes.inputSmall}
                                        margin="normal"
                                        defaultValue={formContactEmail}
                                        onChange={(event) => setFormContactEmail(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <FormControl>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.input}>
                                <Grid item style={{alignSelf: 'flex-start', marginTop: 30}}>
                                    <PhoneRounded/>
                                </Grid>
                                <Grid item>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <FormLabel style={{marginTop: 30}}>Phone Numbers:</FormLabel>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <TextField
                                                id="info-update-phone-1"
                                                label="Phone number 1"
                                                type="tel"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactPhones[0]}
                                                onChange={(event) => {
                                                    let tempPhones = formContactPhones;
                                                    tempPhones[0] = event.target.value;
                                                    setFormContactPhones(tempPhones);
                                                }}
                                            />
                                            <TextField
                                                id="info-update-phone-2"
                                                label="Phone number 2"
                                                type="tel"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactPhones[1]}
                                                onChange={(event) => {
                                                    let tempPhones = formContactPhones;
                                                    tempPhones[1] = event.target.value;
                                                    setFormContactPhones(tempPhones);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </FormControl>
                        <FormControl>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.input}>
                                <Grid item style={{alignSelf: 'flex-start', marginTop: 30}}>
                                    <BusinessRounded/>
                                </Grid>
                                <Grid item>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <FormLabel style={{marginTop: 30}}>Address:</FormLabel>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <TextField
                                                id="info-update-add-1"
                                                label="Address Line 1"
                                                type="text"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactAddress ? formContactAddress.line1 : null}
                                                onChange={(event) => {
                                                    let tempAddress = formContactAddress;
                                                    tempAddress.line1 = event.target.value;
                                                    setFormContactAddress({...tempAddress});
                                                }}
                                            />
                                            <TextField
                                                id="info-update-add-2"
                                                label="Address Line 2"
                                                type="text"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactAddress ? formContactAddress.line2 : null}
                                                onChange={(event) => {
                                                    let tempAddress = formContactAddress;
                                                    tempAddress.line2 = event.target.value;
                                                    setFormContactAddress({...tempAddress});
                                                }}
                                            />
                                            <TextField
                                                id="info-update-add-city"
                                                label="City"
                                                type="text"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactAddress ? formContactAddress.city : null}
                                                onChange={(event) => {
                                                    let tempAddress = formContactAddress;
                                                    tempAddress.city = event.target.value;
                                                    setFormContactAddress({...tempAddress});
                                                }}
                                            />
                                            <TextField
                                                id="info-update-add-country"
                                                label="Country"
                                                type="text"
                                                variant="standard"
                                                margin="dense"
                                                className={classes.inputSmall}
                                                defaultValue={formContactAddress ? formContactAddress.country : null}
                                                onChange={(event) => {
                                                    let tempAddress = formContactAddress;
                                                    tempAddress.country = event.target.value;
                                                    setFormContactAddress({...tempAddress});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' disabled={updating} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='text' disabled={updating} color='primary' onClick={() => submit()}>Submit</Button>
                </DialogActions>
                <Snackbar open={alert2.open} message={alert2.message} type={alert2.type} close={() => {
                    const tempAlert = alert2;
                    tempAlert.open = false;
                    setAlert2({...tempAlert});
                }}/>
            </Dialog>
        )
    }


    const reFetch = () => {
        if (fetching === false)
            return;

        fetch(APIURL('institute'))
            .then(response => {
                if (!response.ok)
                    throw new Error(`${response.status}, ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                setInfo(data);
                setFetching(false);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
                setAlert({
                    open: true,
                    message: error.toString(),
                    type: 'error'
                });
            });
    };

    const convertNumber = (number) => {
        if (number < 10 ** 3) {
            return String(number)
        } else if (number < 10 ** 6) {
            return (number / 10 ** 3).toFixed(1) + 'K'
        } else if (number < 10 ** 9) {
            return (number / 10 ** 6).toFixed(1) + 'M'
        } else if (number < 10 ** 12) {
            return (number / 10 ** 9).toFixed(1) + 'B'
        } else {
            return (number / 10 ** 12).toFixed(1) + 'T'
        }
    }

    if (fetching) {
        return (
            <>
                <Paper className={classes.root}>
                    <Skeleton height='20vh' width='100%' variant="rect"/>
                    <div>
                        <Typography variant='h5' align='left' className={classes.body}>
                            <Skeleton variant="text"/>
                        </Typography>
                        <Divider className={classes.m1}/>
                        <Typography variant='subtitle2' color="textSecondary" align='left' className={classes.body}>
                            <Skeleton variant="text"/>
                        </Typography>
                        <Divider className={classes.m1}/>
                        <Grid container spacing={1} className={classes.contactContainer}>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4' align='center'><Skeleton variant="text"
                                                                                                  width="5vw"/></Typography>
                                <Typography variant='subtitle2' align='center'><Skeleton variant="text"
                                                                                         width="4vw"/></Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4' align='center'><Skeleton variant="text"
                                                                                                  width="5vw"/></Typography>
                                <Typography variant='subtitle2' align='center'><Skeleton variant="text"
                                                                                         width="4vw"/></Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4' align='center'><Skeleton variant="text"
                                                                                                  width="5vw"/></Typography>
                                <Typography variant='subtitle2' align='center'><Skeleton variant="text"
                                                                                         width="4vw"/></Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.m1}/>
                        <Grid container spacing={1} className={classes.contactContainer}>
                            <Grid item xs={6} className={classes.contact}>
                                <Typography variant="subtitle2" className={classes.contactContent}>
                                    <Skeleton variant="rect" width={32} height={32} className={classes.m1}/>
                                    <Skeleton variant="text" width="8vw"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <Typography variant="subtitle2" className={classes.contactContent}>
                                    <Skeleton variant="rect" width={32} height={32} className={classes.m1}/>
                                    <Skeleton variant="text" width="8vw"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <div className={classes.contactContent}>
                                    <Skeleton variant="rect" width={32} height={32} className={classes.m1}
                                              style={{alignSelf: 'start'}}/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Skeleton variant="text" width="8vw"/>
                                        <Skeleton variant="text" width="8vw"/>
                                        <Skeleton variant="text" width="8vw"/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <div className={classes.contactContent}>
                                    <Skeleton variant="rect" width={32} height={32} className={classes.m1}
                                              style={{alignSelf: 'start'}}/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Skeleton variant="text" width="8vw"/>
                                        <Skeleton variant="text" width="8vw"/>
                                        <Skeleton variant="text" width="8vw"/>
                                        <Skeleton variant="text" width="8vw"/>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}} className={classes.m1}>
                            <Skeleton variant="rect" width={152} height={36}/>
                        </div>
                    </div>
                </Paper>
                <Snackbar open={alert.open} message={alert.message} type={alert.type} close={() => {
                    const tempAlert = alert;
                    tempAlert.open = false;
                    setAlert({...tempAlert});
                }}/>
            </>
        )
    } else {
        return (
            <>
                <Paper className={classes.root}>
                    <div style={{height: '20vh', width: '100%', overflow: 'hidden'}}>
                        <img src={info.coverImage} style={{
                            height: 'auto',
                            maxWidth: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}/>
                    </div>
                    <div>
                        <Typography variant='h5' align='left' className={classes.body}>
                            {info.name}
                        </Typography>
                        <Divider className={classes.m1}/>
                        <Typography variant='subtitle2' color="textSecondary" align='left' className={classes.body}>
                            {info.description}
                        </Typography>
                        <Divider className={classes.m1}/>
                        <Grid container spacing={1} className={classes.contactContainer}>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4'
                                            align='center'>{convertNumber(info.stats.noUsers)}</Typography>
                                <Typography variant='subtitle2' align='center'>members</Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4'
                                            align='center'>{convertNumber(info.stats.noPosts)}</Typography>
                                <Typography variant='subtitle2' align='center'>posts</Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.statContainer}>
                                <Typography color='primary' variant='h4'
                                            align='center'>{convertNumber(info.stats.noViews)}</Typography>
                                <Typography variant='subtitle2' align='center'>post views</Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.m1}/>
                        <Grid container spacing={1} className={classes.contactContainer}>
                            <Grid item xs={6} className={classes.contact}>
                                <Typography variant="subtitle2" className={classes.contactContent}>
                                    <LanguageRounded className={classes.m1}/>
                                    <a href={info.domain}>{info.domain ? info.domain : 'none'}</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <Typography variant="subtitle2" className={classes.contactContent}>
                                    <MailOutline className={classes.m1}/>
                                    <a href={`mailto:${info.contactDetails.email}`}>{info.contactDetails.email ? info.contactDetails.email : 'none'}</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <div className={classes.contactContent}>
                                    <PhoneRounded className={classes.m1} style={{alignSelf: 'start'}}/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {info.contactDetails.phoneNos.map(no => {
                                            return (
                                                <Typography variant="subtitle2" align="left">{no}</Typography>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} className={classes.contact}>
                                <div className={classes.contactContent}>
                                    <BusinessRounded className={classes.m1} style={{alignSelf: 'start'}}/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography variant="subtitle2"
                                                    align="left">{info.contactDetails.address.line1},</Typography>
                                        <Typography variant="subtitle2"
                                                    align="left">{info.contactDetails.address.line2},</Typography>
                                        <Typography variant="subtitle2"
                                                    align="left">{info.contactDetails.address.city},</Typography>
                                        <Typography variant="subtitle2"
                                                    align="left">{info.contactDetails.address.country}</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Button variant="text" color="primary" className={classes.m1} onClick={() => setOpen(true)}>Update
                            Info</Button>
                    </div>
                </Paper>
                <Snackbar open={alert.open} message={alert.message} type={alert.type} close={() => {
                    const tempAlert = alert;
                    tempAlert.open = false;
                    setAlert({...tempAlert});
                }}/>
                <UpdateView data={info}/>
            </>
        )
    }
}