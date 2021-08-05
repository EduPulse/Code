import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/academicUser/Home'
import UserProfile from './components/academicUser/UserProfile';
import UpdateProfile from './components/academicUser/UpdateProfile';
import SocialProfileForm from './components/academicUser/SocialProfileForm';
import Customization from './components/academicUser/Customization';
import AllNotifications from './components/academicUser/AllNotifications';
import Publications from './components/academicUser/Publications'
import PublishedPost from './components/academicUser/PublishedPost'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
