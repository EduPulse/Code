import './App.css';
import Navigationbar from './components/navbar';
import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import Tags from './components/tags';
import Joincard from './components/Joincard';
import Posts from './components/posts';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import ModeratorDashboard from './components/moderator/ModeratorDashboard';
import AcademicUserRoute from './components/academicUser/AcademicUserRoute';
import GenUserRoute from './components/generalUser/genUserRoute';
import { user, signin, remove } from './components/auth/auth'
import Button from '@material-ui/core/Button';
import {Carousel} from 'react-bootstrap'
import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.png'
import image4 from './assets/4.jpg'
import './App.scss';

//import {Link } from 'react-router-dom';

/* const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    maingrid: {
        marginTop: '80px',
        width: '80%'
    }
})); */

function App() {
    const [state,setState] = useState(false);
    const history = useHistory();

    let shouldSignIn = new URLSearchParams(window.location.search).get('signin');
    let shouldSignOut = new URLSearchParams(window.location.search).get('signout');

    const redirect = (user) => {
        switch (user.role) {
            case "admin":
                history.push('/components/admin/AdminHome');
                // window.location.href='/components/admin/AdminHome'
                break;
            case "moderator":
                history.push('/moderator/dashboard');
                // window.location.href='/moderator/dashboard';
                break;
            case "academic":
                history.push('/components/academicUser');
                // window.location.href='components/academicUser';
                break;
            case "general":
                history.push('/');
                //history.push('/components/admin/AdminHome');
                break;
            default:
                history.push('/');
                //history.push('/components/admin/AdminHome');
                break;
        }
        setState(true);
    }

        if(shouldSignIn && shouldSignIn === 'true') { // if sign in then render
            signin()
                .then((user) => {
                    console.log('signed in');
                    redirect(user);
                })
                .catch((error) => {
                    console.error(error);
                    setState(true);
                })
        } else if(shouldSignOut && shouldSignOut === 'true') {
            remove();
            setState(true);
        } else {
            return Base();
        }

    if(state) {
        return Base();
    } else {
        return null;
    }
    
}

const Base = () => {
    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/components/admin/AdminHome" component={AdminHome}/>
                <Route path="/moderator/dashboard" component={ModeratorDashboard}/>
                <Route path="/components/academicUser" component={AcademicUserRoute}/>
                <Route path="/components/generalUser" component={GenUserRoute}/>
            </Switch>
        </div>
    );
}

const Home = () => {
    const [state, setstate] = useState(false)
    if(state){
        return (
            <div>
                <Navigationbar/>
                <div align="center">
                    <Grid container spacing={3} style={{marginTop: '80px',width: '80%'}}>
        
                        <Grid item xs>
                            <h3>Trending Tags</h3>
                            <Tags/>
                        </Grid>
        
                        <Grid item xs={6}>
                            {/* <Link to="/components/academicUser/Home">Click here</Link> */}
                            {/* <Link to="/components/admin/AdminHome">Click here</Link> */}
                            <Posts/>
                        </Grid>
        
                        <Grid item xs>
                            <Joincard/>
                        </Grid>
        
                    </Grid>
                </div>
            </div>
        )
    }
    else{
        return (
            <div style={{position:'relative'}} align="center" className='use-bootstrap'>
                <Carousel  variant="dark">
                    <Carousel.Item interval={3000}>
                        <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                        style={{
                            
                            backgroundSize:'cover',
                            height: '100vh',
                            width: '100vw',
                        }}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                        style={{
                            backgroundSize:'cover',
                            height: '100vh',
                            width: '100vw'   
                        }}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                        style={{
                            backgroundSize:'cover',
                            height: '100vh',
                            width: '100vw',
                            
                        }}
                        />
                    </Carousel.Item>

                    <Carousel.Item interval={3000}>
                        <img
                        className="d-block w-100"
                        src={image4}
                        alt="Third slide"
                        style={{
                            backgroundSize:'cover',
                            height: '100vh',
                            width: '100vw',
                        }}
                        />
                    </Carousel.Item>
                </Carousel>
                        
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{position:'absolute',bottom:'70px',right:'200px',borderRadius:'20px',padding:'10px 20px',backgroundColor: '#4411A8'}}
                    onClick={()=>{setstate(true)}}
                >
                    Continue to Edupulse 
                </Button>
            </div>
        )
    }
    
};

export default App;
