import './App.css';
import Navigationbar from './components/navbar';
import { Grid,makeStyles } from '@material-ui/core';
import Tags from './components/tags';
import Joincard from './components/Joincard';
import Posts from './components/posts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import {Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,    
  },
  maingrid:{
    marginTop:'80px',
    width:'80%'
  }
}));

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/components/admin/AdminHome" component={AdminHome}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = ()=>(
  
  <div>
      <Navigationbar/>
      
      <div align="center">
      <Grid container spacing={3} className={useStyles().maingrid}>
        
        <Grid item xs>
          <h3>Trending Tags</h3>
          <Tags/>
        </Grid>

        <Grid item xs={6}>
            <Link to="/components/admin/AdminHome">Click this</Link>
            <Posts/>
            <Posts/>
        </Grid>

        <Grid item xs>
          <Joincard/>
        </Grid>

      </Grid>
      </div>
  </div>
);

export default App;
