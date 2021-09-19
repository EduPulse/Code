import React from 'react';
import {alpha, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Img1 from '../assets/EduPulse.png';
import Img2 from '../assets/EduPulse.png';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {animated, useSpring} from 'react-spring'; // web.cjs is required for IE 11 support
import {Icon} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {GoogleAuth} from './OAuth/googleAuth'
import MsAuth from './OAuth/msAuth.js'
import googleNormal from '../assets/buttons/google_signin_normal.png';
import Msbutton from '../assets/buttons/ms-button.png';

import config from '../config/config'

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
    loginButton: {
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '250px',
        height: '400px'
    },
    logo: {
        width: '70px',
        height: '70px',
        borderRadius: '6px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
    },
    usericon: {
        width: '130px',
        height: '130px',
        display: 'block',
        margin: '20px auto',
    },
    authicons: {
        display: 'block',
        marginLeft: '17.5px',
        marginRight: 'auto',
        marginTop: '40px'
    }
}));

//login box design & animations- start
const Fade = React.forwardRef(function Fade(props, ref) {
    const {in: open, children, onEnter, onExited, ...other} = props;
    const style = useSpring({
        from: {opacity: 0},
        to: {opacity: open ? 1 : 0},
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};
//login box design & animations- end


export default function Navigationbar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        <MenuIcon/>
                    </IconButton>
                    <div className={classes.edupulseIcon}>
                        <img src={Img1} alt="logo" style={{width: '50px', height: '50px'}}/>
                    </div>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>

                    <div className={classes.grow}/>
                    <Button variant="contained" className={classes.loginButton} onClick={handleOpen}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <img src={Img2} alt="logo" className={classes.logo}/>
                        <Icon color="primary">
                            <AccountCircleIcon className={classes.usericon}/>
                        </Icon>

                        <div className={classes.authicons}>

                                <button onClick={()=>{config.applicationRoot+'/openid/google'}}
                                    style={{
                                        padding: '0px 0px',
                                        margin: '0px',
                                        border: 'none',
                                        backgroundColor: '#DFDAE8',
                                        cursor: "pointer"
                                    }}>
                                <img src={googleNormal} alt="google button" style={{width: '218px'}}/>
                            </button>

                            <button onClick={()=>{config.applicationRoot+'/openid/azure'}}
                                    style={{
                                        padding: '0px 0px',
                                        margin: '0px',
                                        border: 'none',
                                        backgroundColor: '#DFDAE8',
                                        cursor: "pointer"
                                    }}>
                                <img src={Msbutton} alt="ms button" style={{width: '218px'}}/>
                            </button>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}