import React from 'react'
import AcademicUserGeneralNav from "./genNavbar";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import GenUserHome from "./GenUserHome";
import SearchResult from './SearchResult';
import ViewArticle from "./ViewArticle";

import AllNotifications from "./AllNotifications";
import Home from "./Home";
import UpdateProfile from "./UpdateProfile";
import PublisherProfile from "./PublisherProfile";
import AuthorProfile from "./AuthorProfile";
import ProfileInfo from './Profile';

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
            <AcademicUserGeneralNav className={classes.navBar}/>
            <Switch>
                <Route path="/" exact component={GenUserHome}/>
                <Route path="/components/generalUser/search" component={SearchResult}/>
                <Route path="/components/generalUser/viewArticle" component={ViewArticle}/>
                {/*<Route path="/components/generalUser/viewUniversityProfile" component={UniversityProfile}/>*/}
                {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}

                {/* <Route path="/components/generalUser/PublisherProfile" component={PublisherProfile}/> */}
                <Route path="/components/generalUser/AuthorProfile" exact component={AuthorProfile} />
                <Route path="/components/generalUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/generalUser/Profile" component={ProfileInfo}/>
                <Route path="/components/generalUser/Update" component={UpdateProfile}/>
                {/* <Route path="/components/generalUser/Saved" component={UpdateProfile}/> */}
            </Switch>
        </Router>
    )
}

