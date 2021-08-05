import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UpdateProfile from './components/academicUser/UpdateProfile'
import AcaNavbar from './components/academicUser/acaNavbar';
import UserProfile from './components/academicUser/UserProfile'
import UpdateProfileForm from './components/academicUser/UpdateProfileForm'
import SocialProfileForm from './components/academicUser/SocialProfileForm';
import Customization from './components/academicUser/Customization';
import EmailNotifications from './components/academicUser/EmailNotifications';

function App() {
    return (
        <Router>
            <div className="App">
                <AcaNavbar/>
                <Switch>
                    <Route path="/" exact component={UserProfile}/>
                    <Route path="/UpdateProfile" exact component={UpdateProfile}/>
                    <Route path="/UpdateProfileForm" exact component={UpdateProfileForm}/>
                    <Route path="/SocialProfileForm" exact component={SocialProfileForm} />
                    <Route path="/Customization" exact component={Customization} />
                    <Route path="/EmailNotifications" exact component={EmailNotifications} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
