import React from 'react'
import AcaNavbar from './navBars/acaNavbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";

import AllNotifications from "./Notifications/AllNotifications";
import Home from "./Home";
import UpdateProfile from "./ProfileUpdate/UpdateProfile";
import ProfileInfo from './ProfileInfo';

import AuthorProfile from './AuthorProfile';

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: "block",
        position: "absolute",
    },
}));

export default function GenUserRoute() {
    const classes = useStyles();
    return (
        // <Interpolator
        //     appearance='dark'
        //     watchSystem={false}
        //     filter={{brightness: 100, contrast: 90, sepia: 10}}
        // >
        <Router>
            <AcaNavbar className={classes.navBar}/>
            <Switch>
                <Route path="/" exact component={Home}/>

                <Route path="/components/academicUser/Notifications/AllNotifications" component={AllNotifications}/>
                <Route path="/components/academicUser/ProfileUpdate/UpdateProfile" component={UpdateProfile}/>
                <Route path="/components/academicUser/ProfileInfo" component={ProfileInfo}/>
                <Route path="/components/academicUser/ AuthorProfile" component={AuthorProfile}/>
            </Switch>
        </Router>
        // </Interpolator>
    )
}