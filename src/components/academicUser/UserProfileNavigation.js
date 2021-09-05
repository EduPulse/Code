import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function UserProfileNavigation() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/components/academicUser/UserProfile"/>
                </Switch>
            </div>
        </Router>
    )
}

export default UserProfileNavigation