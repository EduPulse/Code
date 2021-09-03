import React from 'react';
import {Link} from "react-router-dom";
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Img1 from '../../../assets/EduPulse.png';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import {user} from "../../auth/auth";

import ProfileInfo from './ProfileInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#4411A8',
    paddingLeft: '0px',
    paddingRight: '0px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  },
  edupulseIcon: {
    marginRight: theme.spacing(2)
  },
  postbutton: {
    backgroundColor: '#935FF9',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    color: 'white',
    width: '20%',
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '50px',

    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '40%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  linkStyles: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
        textDecoration: 'none',
    }
  },
}));

export default function GenNavbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      className={classes.menuStyle}
    >
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Settings & Privacy</MenuItem>
      </Link>
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Post & Activity</MenuItem>
      </Link>
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        pt={1}
      >
        <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
          <Button color="secondary" variant="outlined">Logout</Button>
        </Link>
      </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
          <Link to={"/components/academicUser/AllNotifications"} className={classes.linkIcon} >
              <NotificationsIcon />
            </Link>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Badge color="secondary">
          <Link to={"/components/academicUser/ProfileInfo"} className={classes.linkIcon} >
            <AccountCircle />
            </Link>
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Settings & Privacy</MenuItem>
      </Link>
      <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
        <MenuItem onClick={handleMenuClose}>Post & Activity</MenuItem>
      </Link>
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        pt={1}
      >
        <Link className={useStyles().linkStyles} to="/components/generalUser/Update">
          <Button color="secondary" variant="outlined">Logout</Button>
        </Link>
      </Box>
    </Menu>
  );

  const handleInput = event => {
    if (event.key === 'Enter') {
        // goto search result page
        window.location.assign("/components/generalUser/search/" + event.target.value)
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>

          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.edupulseIcon}>
            <Link to="/" style={{textDecoration: "none", color: "#fff"}}>
              <img src={Img1} alt="logo" style={{width: '50px', height: '50px'}}/>
            </Link>
          </div>

          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleInput}
            />
          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <Link className={useStyles().linkStyles} to="/components/generalUser/AllNotifications">
              <IconButton aria-label="show 17 new notifications" color="inherit" style={{ color: '#FFF' }}>
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Profile image"
                      src={user().profilePicture}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
