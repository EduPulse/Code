import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import CreatePost from './components/academicUser/CreatePost';
import WriteArticle from './components/academicUser/WriteArticle';
import PreviewArticle from './components/academicUser/PreviewArticle';
import ViewArticle from './components/academicUser/ViewArticle';
import WriterInfo from './components/academicUser/writerInfo';
import Article from './components/academicUser/article';
import AcademicDashboard from './components/academicUser/AcademicDashboard';
import AcademicDashboardRoute from './components/academicUser/AcademicDashboardRoute';
import Publication from './components/academicUser/publication';
import UserCard from './components/academicUser/userCard';
import UniversityListing from './components/academicUser/universityListing';
import SearchResult from './components/academicUser/SearchResult';
import PostListing from './components/academicUser/postListing';
import UniversityProfile from './components/moderator/UniversityProfile'
import AcademicHome from './components/academicUser/AcademicHome'
import PostComment from './components/academicUser/PostComment'
import DisplayComment from './components/academicUser/DisplayComment'

ReactDOM.render(
  <React.StrictMode>
      {/*<App/>*/}
      <AcademicDashboardRoute/>
      {/*<PostComment/>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

