import React from 'react'
import AcaNavbar from './acaNavbar';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
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
        <Router>
            <AcaNavbar className={classes.navBar}/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/components/academicUser/SearchResult" component={SearchResult}/>
                <Route path="/components/academicUser/ViewArticle" component={ViewArticle}/>

                <Route path="/components/academicUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/academicUser/PublisherProfile" component={PublisherProfile}/>
                <Route path="/components/academicUser/UpdateProfile" component={UpdateProfile}/>
                <Route path="/components/academicUser/ProfileInfo" component={ProfileInfo}/>
                <Route path="/components/academicUser/Article" component={Article} />
                {/* <Route path="/components/generalUser/UpdateProfileForm" component={UpdateProfile}/> */}
                {/* <Route path="/components/generalUser/Customization" component={Customization}/> */}
                {/* <Route path="/components/generalUser/EmailNotifications" component={EmailNotifications}/> */}
            </Switch>
        </Router>
    )
}