import './App.css';
import { Grid,makeStyles, Typography, Button, CardContent, Card, Avatar } from '@material-ui/core';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UpdateProfile from './components/academicUser/UpdateProfile'
import AcaNavbar from './components/academicUser/acaNavbar';
import PublicationInfo from './components/academicUser/PublicationInfo'
import Posts from './components/posts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    backgroundColor: '#DFDAE8',
  },

  profileInfo: {
    marginTop:'90px',
    marginBottom: '20px',
    width: '100%'
  },

  pubPostInfo: {
      width: '100%'
  },
  
  postsInfo:{
    width:'100%',
  },
  avatar: {
    backgroundColor:'#935FF9',
    marginLeft: '450px'
  },
  buttonStyle: {
    backgroundColor: '#935FF9',
    color: '#FFFFFF',
    marginLeft: '300px',
    '&:hover': {
      backgroundColor: '#4411A8',
    },
    marginBottom: '20px'
  },
  linkStyles: {
      color: '#FFFFFF',
      textDecoration: 'none',
      '&:hover': {
        color: '#FFFFFF',
        textDecoration: 'none',
      }
  }
}));

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={UserProfilePage}/>
                    <Route path="/components/academicUser/UpdateProfile" exact component={UpdateProfile}/>
                </Switch>
            </div>
        </Router>
    );
}

const UserProfilePage = () => (
    <div>
        <AcaNavbar/>
   
        <div align="center">
            <div className={useStyles().root}>
                <Grid container className={useStyles().profileInfo}>
                    {/* <ProfileInfo/> */}
                    <Card className={useStyles().root}>
                        <CardContent>
                            <Grid container spacing={3} >
                                <Grid item >
                                    <Avatar aria-label="recipe" className={useStyles().avatar}>N</Avatar>
                                </Grid>

                                <Grid item  >
                                    <Button aria-label="recipe" className={useStyles().buttonStyle}  >
                                        <Link className={useStyles().linkStyles} to="/components/academicUser/UpdateProfile">
                                            Edit Profile
                                        </Link>
                                    </Button>
                                </Grid>
                            </Grid>

                            <Typography gutterBottom variant="h5" component="h2"> 
                                Naveen Perera
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <p>An undergraduate of UOC</p>
                                <p>Faculty of Science</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid container spacing={3} className={useStyles().pubPostInfo}>
                    <Grid item xs className={useStyles().postsInfo}>
                        <PublicationInfo/>
                    </Grid>
                    <Grid item xs={8} className={useStyles().postsInfo}>
                        <Posts/>
                        <Posts/>
                    </Grid>
                </Grid>
            </div>
        </div>
    </div>
);

export default App;
