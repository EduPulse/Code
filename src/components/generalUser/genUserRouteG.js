import React from 'react'
import GenNavbar from "./genNavbarG";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
// import GenUserHome from "./GenUserHomeG";
// import SearchResult from './SearchResult';
// import ViewArticle from "./ViewArticle";
import AllNotifications from "./AllNotificationsG";
import UpdateProfile from "./ProfileUpdate/UpdateProfile";
// import AuthorProfile from "./AuthorProfileG";
import ProfileInfo from './ProfileG';

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: "block",
        position: "absolute",
    },
}));

export default function GenUserRoute() {
    const classes = useStyles();
    return (
        <Router>
            <GenNavbar className={classes.navBar}/>
            <Switch>
                {/* <Route path="/" exact component={GenUserHome}/> */}
                {/* <Route path="/components/generalUser/search" component={SearchResult}/> */}
                {/* <Route path="/components/generalUser/viewArticle" component={ViewArticle}/> */}
                {/*<Route path="/components/generalUser/viewUniversityProfile" component={UniversityProfile}/>*/}
                {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}

                {/* <Route path="/components/generalUser/PublisherProfile" component={PublisherProfile}/> */}
                {/* <Route path="/components/generalUser/AuthorProfile" component={AuthorProfile} /> */}
                <Route path="/components/generalUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/generalUser/Profile" component={ProfileInfo}/>
                <Route path="/components/generalUser/Update" component={UpdateProfile}/>
                {/* <Route path="/components/generalUser/Saved" component={UpdateProfile}/> */}
            </Switch>
        </Router>
    )
}

