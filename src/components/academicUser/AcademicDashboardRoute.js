import React from 'react'
import AcademicUserGeneralNav from "./acaNavbar";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AcademicDashboard from "./AcademicDashboard";
import CreatePost from './CreatePost';
import WriteArticle from './WriteArticle';
import PreviewArticle from "./PreviewArticle";
import SearchResult from './SearchResult';
import ViewArticle from "./ViewArticle";
const useStyles = makeStyles((theme) => ({
    navBar: {
        display: "block",
        position: "absolute",
    },
}));

export default function AcademicDashboardRoute() {
    const classes = useStyles();
    return (
        <Router>
            <AcademicUserGeneralNav className={classes.navBar}/>
            <Switch>
                <Route path="/components/academicUser/academicDashboard" component={AcademicDashboard}/>
                <Route path="/components/academicUser/createPost" component={CreatePost}/>
                <Route path="/components/academicUser/writeArticle" component={WriteArticle}/>
                <Route path="/components/academicUser/previewPost" component={PreviewArticle}/>
                <Route path="/components/academicUser/search" component={SearchResult}/>
                {/*<Route path="/components/academicUser/userProfile" component={Home}/>*/}
                <Route path="/components/academicUser/viewArticle" component={ViewArticle}/>
            </Switch>
        </Router>
    )
}
