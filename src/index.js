import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AcaUserRoute from './components/academicUser/AcaUserRoute';
import TestTheme from './TestTheme'

ReactDOM.render(
  <React.StrictMode>
    {/* <TestTheme />
    <h1>Author is { window.author }</h1> */}
    <AcaUserRoute />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals