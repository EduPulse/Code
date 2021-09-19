import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {
    Box,
    Divider,
    Grid,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Alert, Skeleton} from '@material-ui/lab';

import {Refresh} from '@material-ui/icons';

import ModNavbar from "./modNavbar";
import ReportEntry from "./reports/ReportEntry";
import ReportView from "./reports/ReportView";
import PendingUserEntry from "./pendingUsers/pendingUserEntry"
import InfoView from "./InfoView"
import APIURL from "../API/APIURL";

import {user} from "../auth/auth"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 60,
    },
    navBar: {
        display: "block",
        position: "absolute",
    },
    dashContainer: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0),
            width: '90vw',
        },
        minHeight: '80vh'
    },
    dashInfo: {
        padding: theme.spacing(2),
        minHeight: '73vh',
    },
    showOnXS: {
        [theme.breakpoints.up('md')]: {
            visibility: 'hidden'
        }
    },
    m1: {
        margin: theme.spacing(1)
    },
    m2: {
        margin: theme.spacing(2)
    },
    list: {
        display: 'flex',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function Reports() {
    const classes = useStyles();
    const [reports, updatereports] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const pathParams = useParams();

    const [selectedReport, setSelectedReport] = useState(pathParams.id);
    const isSelected = (key) => {
        return (key === selectedReport)
    };

    const [viewOpen, setViewOpen] = useState(true);

    const reFetch = () => {

        if (isLoading === false)
            return;

        fetch(APIURL('reports'))
            .then(response => {
                if (!response.ok)
                    throw new Error(`${response.status}, ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                updatereports(() => {
                    const newreports = {};
                    data.forEach(report => {

                        // set checked to false
                        report.reports = report.reports.map(item => {
                            item.checked = false;
                            return item;
                        });

                        // Array to document
                        if (report.type === 'post') {
                            newreports[report._id.post._id] = report;
                        } else {
                            newreports[report._id.comment._id] = report;
                        }

                    });
                    return newreports;
                })
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setFetchError(err.toString());
            });
    };

    // fetch if loading
    useEffect(() => {
        reFetch();
    }, [isLoading]);

    // load if refresh is clicked
    useEffect(() => {
        document.getElementById('button-global-refresh').addEventListener('click', () => {
            setIsLoading(true);
        });
    });

    if (fetchError) {
        return (
            <Alert severity="error" className={classes.m2}>{fetchError}</Alert>
        );
    } else if (isLoading === true) {
        return (
            <React.Fragment>
                {
                    [1, 2, 3, 4].map(key => {
                        return (
                            <ListItem divider key={key} alignItems="flex-start">
                                <ListItemAvatar style={{alignContent: 'center'}}>
                                    <Skeleton variant="circle" width={40} height={40} animation="wave"/>
                                </ListItemAvatar>
                                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                    <ListItemText disableTypography
                                                  primary={
                                                      <Skeleton variant="text" style={{width: '40%'}}/>
                                                  }
                                                  secondary={
                                                      <Skeleton variant="rect" height={54}/>
                                                  }
                                    />
                                    <div component='ul' className={classes.chipArray}>
                                        <Skeleton variant="text" style={{width: '60%'}}/>
                                    </div>
                                </div>
                            </ListItem>
                        );
                    })
                }
            </React.Fragment>
        );
    } else {
        let keys = [];
        for (let key in reports) {
            keys.push(key);
        }
        if (keys.length === 0) {
            return (
                <Alert severity="success" className={classes.m2}>No reports available</Alert>
            );
        } else {
            return (
                <React.Fragment>
                    <List>
                        {keys.map(key => <ReportEntry key={key} _id={key}
                                                      report={reports[key]}
                                                      isSelected={isSelected} select={(id) => {
                                setViewOpen(true);
                                setSelectedReport(id);
                            }}
                            />
                        )}
                    </List>
                    <ReportView
                        _id={selectedReport}
                        report={reports[selectedReport]}
                        updateReport={(update) => updatereports(() => {
                            console.log('updating');
                            const tempreports = reports;
                            tempreports[selectedReport] = update;
                            return {...tempreports};
                        })}
                        open={viewOpen && keys.includes(selectedReport)}
                        close={() => {
                            setViewOpen(false);
                            setSelectedReport('')
                        }}
                        onExited={() => {
                            console.log('exited');
                            setSelectedReport('')
                        }}
                        selected={pathParams.sub_id}
                    />
                </React.Fragment>
            );
        }
    }
    ;
};

function PendingUsers() {
    const classes = useStyles();
    const [users, updateUsers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const pathParams = useParams();

    const [selectedUser, setSelectedUser] = useState(pathParams.id);
    const isSelected = (key) => {
        return (key === selectedUser)
    };

    const [viewOpen, setViewOpen] = useState(true);

    const removeFromList = (key) => {
        let tempList = users;
        delete tempList[key];
        updateUsers({...users});
    }

    const reFetch = () => {

        if (isLoading === false)
            return;

        fetch(APIURL('pending-users'))
            .then(response => {
                if (!response.ok)
                    throw new Error(`${response.status}, ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                updateUsers(() => {
                    let newUsers = {};
                    data.forEach(user => {
                        newUsers[user._id] = user
                    });
                    return newUsers;
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setFetchError(err.toString());
            });
    };

    // fetch if loading
    useEffect(() => {
        reFetch();
    }, [isLoading]);

    // load if refresh is clicked
    useEffect(() => {
        document.getElementById('button-global-refresh').addEventListener('click', () => {
            setIsLoading(true);
        });
    });

    if (fetchError) {
        return (
            <Alert severity="error" className={classes.m2}>{fetchError}</Alert>
        );
    } else if (isLoading === true) {
        return (
            <List>
                {
                    [1, 2, 3, 4, 5, 6].map(key => {
                        return (
                            <ListItem divider alignItems="flex-start" style={{height: 81}}>
                                <ListItemAvatar style={{alignContent: 'center'}}>
                                    <Skeleton variant="circle" width={40} height={40} animation="wave"/>
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    style={{display: 'flex', flexDirection: 'column'}}
                                    primary={
                                        <Skeleton variant="text" style={{width: '40%'}} animation="wave"/>
                                    }
                                    secondary={
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <Divider orientation="vertical" flexItem
                                                     style={{marginInline: 10, margin: 5}}/>
                                            <Skeleton variant="text" style={{width: '30%'}} animation="wave"/>
                                        </div>
                                    }
                                />
                                <ListItemSecondaryAction style={{display: 'flex', flexDirection: 'row'}}>
                                    <Skeleton variant="rect" style={{margin: 10}} width={92} height={36}
                                              animation="wave"/>
                                    <Skeleton variant="rect" style={{margin: 10}} width={92} height={36}
                                              animation="wave"/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    } else {
        let keys = [];
        for (let key in users) {
            keys.push(key);
        }
        if (keys.length === 0) {
            return (
                <Alert severity="success" className={classes.m2}>No pending users available</Alert>
            );
        } else {
            return (
                <React.Fragment>
                    <List>
                        {keys.map(key => <PendingUserEntry key={key} _id={key}
                                                           user={users[key]}
                                                           isSelected={isSelected} select={(id) => {
                                setViewOpen(true);
                                setSelectedUser(id);
                            }}
                                                           remove={(key) => removeFromList(key)}
                            />
                        )}
                    </List>
                </React.Fragment>
            );
        }
    }
    ;
};

function InstituteInfo() {

    const classes = useStyles();

    return (
        <div className={classes.dashInfo}>
            <InfoView height={classes.dashInfo.minHeight}/>
        </div>
    );
}

export default function ModeratorDashboard() {

    const classes = useStyles();
    const {path} = useRouteMatch();
    const {pathname} = useLocation();
    const history = useHistory();

    const findActiveTab = () => {
        const paths = pathname.split('/');
        if (paths.length <= 3 || paths[3] === 'reports') return 0;
        else if (paths[3] === 'pending-users') return 1;
        else if (paths[3] === 'info') return 2;
        else return 0;
    }

    const [activeTab, setActiveTab] = useState(findActiveTab);

    const handleChange = (event, newIndex) => {
        setActiveTab(newIndex);
    };

    const Stuff = () => {
        const subPath = useRouteMatch();
        const subParams = useParams();
        const subLoc = useLocation();

        console.log(subPath);
        console.log(subParams);
        console.log(subLoc);

        return (
            <Box p={3}>
                <Typography>Path: {subPath.path}</Typography>
                <Typography>Params: {subPath.path}</Typography>
                <Typography>Loc: {subPath.path}</Typography>
            </Box>
        )
    }

    useEffect(() => {
        console.log(user());
    })

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ModNavbar className={classes.navBar}/>
            <div className={classes.root}>

                <Grid container>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.dashContainer}>
                            <div style={{display: 'flex', width: '100%', height: 'fit-content', flexDirection: 'row'}}>
                                <div style={{width: '100%'}}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        centered
                                    >
                                        <Tab
                                            label="reports"
                                            id="moderator-tab-0"
                                            onClick={() => history.push(`${path}/reports`)}
                                        />
                                        <Tab
                                            label="Pending users"
                                            id="moderator-tab-1"
                                            onClick={() => history.push(`${path}/pending-users`)}
                                        />
                                        <Tab className={classes.showOnXS}
                                             label="Info"
                                             id="moderator-tab-2"
                                             onClick={() => history.push(`${path}/info`)}
                                        />
                                    </Tabs>
                                </div>
                                <Tooltip title="Refresh">
                                    <IconButton aria-label="refresh" id="button-global-refresh">
                                        <Refresh/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Divider variant="middle"/>

                            <Switch>
                                <Route path={`${path}/reports/:id/:sub_id`} component={Reports}></Route>
                                <Route path={`${path}/reports/:id`} component={Reports}></Route>
                                <Route path={`${path}/reports`} component={Reports}></Route>
                                <Route path={`${path}/pending-users/:id`} component={PendingUsers}></Route>
                                <Route path={`${path}/pending-users/`} component={PendingUsers}></Route>
                                <Route path={`${path}/stats`} component={InstituteInfo}></Route>
                                <Route path={`${path}/info`} component={InstituteInfo}></Route>
                                <Route path={`${path}/`} component={Reports}></Route>
                            </Switch>

                        </Paper>
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={4}>
                            <InstituteInfo/>
                        </Grid>
                    </Hidden>

                </Grid>
            </div>
        </div>
    );
}
