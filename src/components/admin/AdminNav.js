import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Img1 from '../../assets/EduPulse.png';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeedIcon from '@material-ui/icons/Speed';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#4411A8',
  },
  edupulseIcon: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2)
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    alignItems:'center'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function AdminNav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <center>
            <img src={Img1} alt="logo" 
            style={{
              width:'50px',
              height:'50px',
              boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
              margin:'10px 0px',
              borderRadius:'5px'
            }}/>
        </center>

      <List>
          <Link to="/components/admin/AdminHome" style={{ textDecoration: 'none',color:'black' }}>
            <ListItem button key={'Dashboard'}>
              <ListItemIcon><SpeedIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </Link>

          <Link to="/components/admin/UserAccManage" style={{ textDecoration: 'none',color:'black' }}>
            <ListItem button key={'User Accounts'}>
              <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary={'User Accounts'} />
            </ListItem>
          </Link>

          <Link to="/components/admin/AdvManage" style={{ textDecoration: 'none',color:'black' }}>
          <ListItem button key={'Advertisments'}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary={'Advertisments'} />
          </ListItem>
          </Link>

          <Link to="/components/admin/Moderators" style={{ textDecoration: 'none',color:'black' }}>
          <ListItem button key={'Moderators'}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={'Moderators'} />
          </ListItem>
          </Link>

      </List>
      <Divider />
      <center>
        <Link to="/" style={{ textDecoration: 'none',color:'black' }}>
        <Button variant="contained" color="secondary" style={{marginTop:'50vh'}}>Logout</Button>
        </Link>
      </center>
      
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
              {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
                        {list(anchor)}
                    </Drawer>
                    </React.Fragment>
                ))}

          </IconButton>
          <div className={classes.edupulseIcon}>
              <img src={Img1} alt="logo" style={{width:'50px',height:'50px'}}/>
          </div>
          
          <div className={classes.grow} />
          
          <div className={classes.sectionDesktop}>
            <Typography style={{marginRight:'20px',fontWeight:'600'}}>Welcome, Admin</Typography>  
            <IconButton aria-label="show notifications" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
        
      </AppBar>
      
      {renderMenu}
      
    </div>
  );
}
