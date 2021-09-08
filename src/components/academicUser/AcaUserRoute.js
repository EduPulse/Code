import React from 'react'
import AcaNavbar from './navBars/acaNavbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import SearchResult from './SearchResult';
import ViewArticle from "./ViewArticle";

import AllNotifications from "./AllNotifications";
import Home from "./Home";
import UpdateProfile from "./UpdateProfile";
import PublisherProfile from "./PublisherProfile";
import Article from "./Article";
import ProfileInfo from './ProfileInfo';

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
                {/* <Route path="/" exact component={AuthorProfile} /> */}
                <Route path="/components/academicUser/SearchResult" component={SearchResult}/>
                <Route path="/components/academicUser/ViewArticle" component={ViewArticle}/>

                <Route path="/components/academicUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/academicUser/PublisherProfile" component={PublisherProfile}/>
                <Route path="/components/academicUser/UpdateProfile" component={UpdateProfile}/>
                <Route path="/components/academicUser/ProfileInfo" component={ProfileInfo}/>
                <Route path="/components/academicUser/Article" component={Article}/>
            </Switch>
        </Router>
        // </Interpolator>
    )
}