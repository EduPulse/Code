import React from 'react'
import AcademicUserGeneralNav from "./navBars/acaNavbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AcademicDashboard from "./AcademicDashboard/AcademicDashboard";
import CreatePost from './CreatePost/CreatePost';
import WriteArticle from './CreatePost/WriteArticle';
import PreviewArticle from "./subComponents/PreviewArticle";
import SearchResult from './Search/SearchResult';
import ViewArticle from "./ViewArticle/ViewArticle";
import UniversityProfile from "../moderator/UniversityProfile";
import AcademicHome from "./AcademicHome";
import UploadMedia from "./CreatePost/UploadMedia";
import ArticleVersioning from "./CreatePost/ArticleVersioning";
import {user} from "../auth/auth";
import Navigationbar from "../navbar";
import GenNavbar from "./navBars/genNavbar";
import AllNotifications from "./Notifications/AllNotifications";
import UpdateProfile from "./ProfileUpdate/UpdateProfile";
import ProfileInfo from './ProfileInfo';
import AuthorProfile from "./AuthorProfile";

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: "block",
        position: "absolute",
    },
}));

export default function AcademicUserRoute() {
    const classes = useStyles();

    let userID = ""
    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
    }

    return (
        <Router>
            {userRole === "" ? (
                // non login user
                <Navigationbar/>
            ) : (
                userRole === "academic" ? (
                    // academic user
                    <AcademicUserGeneralNav className={classes.navBar}/>
                ) : (
                    // general lodged in user
                    <GenNavbar/>
                )
            )}
            {console.log(window.location.href)}
            <Switch>
                <Route path="/components/academicUser/" exact component={AcademicHome}/>
                <Route path="/components/academicUser/tagLookup" component={AcademicHome}/>
                <Route path="/components/academicUser/academicDashboard" component={AcademicDashboard}/>
                <Route path="/components/academicUser/createPost" component={CreatePost}/>
                <Route path="/components/academicUser/writeArticle" component={WriteArticle}/>
                <Route path="/components/academicUser/ArticleVersioning" component={ArticleVersioning}/>
                <Route path="/components/academicUser/uploadMedia" component={UploadMedia}/>
                <Route path="/components/academicUser/previewPost" component={PreviewArticle}/>
                <Route path="/components/academicUser/search" component={SearchResult}/>
                {/*<Route path="/components/academicUser/userProfile" component={}/>*/}
                <Route path="/components/academicUser/viewArticle" component={ViewArticle}/>
                <Route path="/components/academicUser/viewUniversityProfile" component={UniversityProfile}/>


                <Route path="/components/academicUser/Notifications/AllNotifications" component={AllNotifications}/>
                <Route path="/components/academicUser/ProfileUpdate/UpdateProfile" component={UpdateProfile}/>
                <Route path="/components/academicUser/ProfileInfo" component={ProfileInfo}/>
                <Route path="/components/academicUser/AuthorProfile" component={AuthorProfile}/>

            </Switch>
        </Router>
    )
}
