import React from 'react'
import AcademicUserGeneralNav from "./navBars/acaNavbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AcademicDashboard from "./AcademicDashboard";
import CreatePost from './CreatePost';
import WriteArticle from './WriteArticle';
import PreviewArticle from "./subComponents/PreviewArticle";
import SearchResult from './SearchResult';
import ViewArticle from "./ViewArticle";
import UniversityProfile from "../moderator/UniversityProfile";
import AcademicHome from "./AcademicHome";
import UploadMedia from "./UploadMedia";
import ArticleVersioning from "./ArticleVersioning";

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: "block",
        position: "absolute",
    },
}));

export default function AcademicUserRoute() {
    const classes = useStyles();
    return (
        <Router>
            <AcademicUserGeneralNav className={classes.navBar}/>
            <Switch>
                <Route path="/" exact component={AcademicHome}/>
                <Route path="/tagLookup" component={AcademicHome}/>
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
            </Switch>
        </Router>
    )
}
