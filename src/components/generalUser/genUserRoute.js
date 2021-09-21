import React from 'react'
import GenNavbar from "./genNavbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import GeneralHome from "./GeneralHome";
import SearchResult from './Search/SearchResult';
import ViewArticle from "./ViewArticle/ViewArticle";
import AllNotifications from "./Notifications/AllNotifications";
import UpdateProfile from "./ProfileUpdate/UpdateProfile";
import AuthorProfile from "../academicUser/AuthorProfile";
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
        <Router>
            <GenNavbar className={classes.navBar}/>
            <Switch>
                <Route path="/components/generalUser" exact component={GeneralHome}/>
                <Route path="/components/generalUser/new" component={GeneralHome}/>
                <Route path="/components/generalUser/tagLookup" component={GeneralHome}/>
                <Route path="/components/generalUser/search" component={SearchResult}/>
                <Route path="/components/generalUser/viewArticle" component={ViewArticle}/>
                {/* <Route path="/components/generalUser/viewUniversityProfile" component={UniversityProfile}/> */}
                {/*<Route path="/components/generalUser/userProfile" component={Home}/>*/}

                {/* <Route path="/components/generalUser/PublisherProfile" component={PublisherProfile}/> */}
                <Route path="/components/generalUser/userProfile" component={AuthorProfile} />
                <Route path="/components/generalUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/generalUser/ProfileInfo" component={ProfileInfo}/>
                <Route path="/components/generalUser/UpdateProfile" component={UpdateProfile}/>
                {/* <Route path="/components/generalUser/Saved" component={UpdateProfile}/> */}
            </Switch>
        </Router>
    )
}

