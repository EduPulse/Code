import React, {useState} from 'react';
import {alpha, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Img1 from '../../../assets/EduPulse.png';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

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
    actionButton: {
        backgroundColor: '#935FF9',
        borderRadius: '5px',
        width: "90%",
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        color: 'white',
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
}));

export default function NavBarWP() {
    const classes = useStyles();
    const [state, setstate] = useState(false)
    const ModalOpen = () => {
        setstate(true)
    };

    let postID = localStorage.getItem('postID');

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
                        <Link to="/" style={{textDecoration: "none", color: "#fff"}}>
                            <img src={Img1} alt="logo" style={{width: '50px', height: '50px'}}/>
                        </Link>
                    </div>

                    <div className={classes.grow}/>
                    {
                        window.location.href.search("previewPost") !== -1 ? (
                            // TODO when post versioning this must change
                            <Link to={"/components/academicUser/writeArticle/" + postID}
                                  style={{textDecoration: "none", color: "#fff", width: '10%',}}>
                                <Button variant="contained" className={classes.actionButton}>
                                    Edit
                                </Button>
                            </Link>
                        ) : (
                            <Link to={"/components/academicUser/previewPost/" + postID}
                                  style={{textDecoration: "none", color: "#fff", width: '10%',}}>
                                <Button variant="contained" className={classes.actionButton}>
                                    Preview
                                </Button>
                            </Link>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
