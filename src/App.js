import './App.css';
import Navigationbar from './components/navbar';
import { Grid,makeStyles } from '@material-ui/core';
import Tags from './components/tags';
import Joincard from './components/Joincard';
import Posts from './components/posts';
import Home from './components/academicUser/Home';

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
  const classes = useStyles();
  return (
    
    <div className="App">
      <Navigationbar/>
      
      <div align="center">
      <Grid container spacing={3} className={classes.maingrid}>
        
        <Grid item xs>
          <h3>Trending Tags</h3>
          <Tags/>
        </Grid>

        <Grid item xs={6}>
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
}

export default App;
