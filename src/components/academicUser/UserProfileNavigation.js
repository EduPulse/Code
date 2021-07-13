import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

function UserProfileNavigation() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/components/academicUser/UserProfile" />
                </Switch>
            </div>
        </Router>
    )
}

export default UserProfileNavigation
