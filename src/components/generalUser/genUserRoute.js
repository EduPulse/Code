import React from 'react'
import AcademicUserGeneralNav from "./genNavbar";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import SearchResult from './SearchResult';
import ViewArticle from "./ViewArticle";

import AllNotifications from "./AllNotifications";
import Customization from "./Customization";
import EmailNotifications from "./EmailNotifications";
import Home from "./Home";
import UpdateProfile from "./UpdateProfile";
import UpdateProfileForm from "./UpdateProfileForm";
import PublisherProfile from "./PublisherProfile";

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
                <Route path="/components/generalUser/search" component={SearchResult}/>
                {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}
                <Route path="/components/generalUser/Home" component={Home}/>
                <Route path="/components/generalUser/viewArticle" component={ViewArticle}/>

                <Route path="/components/generalUser/AllNotifications" component={AllNotifications}/>
                <Route path="/components/generalUser/PublisherProfile" component={PublisherProfile}/>
                <Route path="/components/generalUser/Update" component={UpdateProfile}/>
                {/* <Route path="/components/generalUser/UpdateProfileForm" component={UpdateProfile}/> */}
                {/* <Route path="/components/generalUser/Customization" component={Customization}/> */}
                {/* <Route path="/components/generalUser/EmailNotifications" component={EmailNotifications}/> */}
            </Switch>
        </Router>
    )
}

