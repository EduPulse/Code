import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FlagIcon from '@material-ui/icons/Flag';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {ClickAwayListener, Grow, Link, MenuItem, MenuList, Paper, Popper, TextField} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
        height: 467,
        borderRadius: 5,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    authorInfo: {
        fontSize: 18,
        fontWeight: 550,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    summaryValues: {
        textAlign: "center",
    },
    title: {
        textAlign: "center",
        fontWeight: 600,
        height: 85,
        overflow: "hidden",
    },
    profilePic: {
        width: 50,
        height: 50,
        margin: "auto",

    },
}));

export default function PostListing({userID, postID, title, coverImage, author, authorPP, publishedData, likes, pins, readTime}) {


    const classes = useStyles();
    let likeCount = 0;
    likes.map(item => {
        likeCount++;
    })
    let pinCount = 0;
    pins.map(item => {
        pinCount++;
    })

    // library operation
    let [stateCollectionList, setStateCollectionList] = useState([]);

    // check post already in library
    const urlAvailability = "http://localhost:9000/add_to_library/is_available_at_library";
    let data = {
        "post_ID": postID,
        "user_ID": userID,
    };
    useEffect(() => {
        axios.post(urlAvailability, data).then(function (response) {
            setLibraryAdd("#935FF9")
        }).catch(function () {
            console.error("collection availability check failed");
        })
    }, [urlAvailability]);

    // list out collections
    const getAllCollection = "http://localhost:9000/add_to_library/get_collection_list";
    data = {
        "user_ID": userID,
    };
    useEffect(() => {
        axios.post(getAllCollection, data).then(function (response) {
            setStateCollectionList(response.data);
        }).catch(function () {
            console.error("collection load failed");
        })
    }, [getAllCollection]);

    // dropdown collection list
    const [libraryAdd, setLibraryAdd] = React.useState("black");
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);


    // create new collection and save
    const handleKeyPress = (event) => {
        // check for press enter event
        if (event.key === "Enter") {
            // create api url
            let urlWriteComment = "http://localhost:9000/add_to_library/create_collection_save_post";
            let data = {
                "post_ID": postID,
                "user_ID": userID,
                "collection_name": event.target.value
            };
            // clean text field
            event.target.value = "";
            axios.post(urlWriteComment, data).then(function (response) {
                console.log("collection created and saved")
                setLibraryAdd("#935FF9")
            }).catch(function () {
                console.error("ccas failed");
            })

            setOpen(false);
        }
    };

    const handleAddLibrary = (event) => {
        // create api url
        let urlAddToSelectedLibrary = "http://localhost:9000/add_to_library/save_post";
        let data = {
            "post_ID": postID,
            "user_ID": userID,
            "collection_name": event.target.value
        };
        // clean text field
        event.target.value = "";
        axios.post(urlAddToSelectedLibrary, data).then(function (response) {
            console.log("collection created and saved")
            setLibraryAdd("#935FF9")
        }).catch(function () {
            console.error("ccas failed");
        })

        setOpen(false);

    };


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt="Profile image" className={classes.profilePic} src={authorPP}/>
                }
                title={
                    <span className={classes.authorInfo}>
                        <Link href={"/components/academicUser/userProfile"}
                              style={{fontWeight: 600, textDecoration: "none"}}>{author}</Link>
                    </span>
                }
                subheader={publishedData}
            />
            <CardMedia
                className={classes.media}
                image={coverImage}
            />
            <CardContent>
                <Typography variant="h4" color="" component="h4" className={classes.title}>
                    <Link href={'/components/academicUser/viewArticle/' + postID} style={{
                        fontWeight: 600,
                        textDecoration: "none",
                        height: 85,
                        overflow: "hidden"
                    }}>{title}</Link>

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={3} className={classes.statSection}>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <ThumbUpAltIcon/> <br/>{likeCount} <br/>Likes
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <FlagIcon/> <br/>{pinCount} <br/>Pins
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues} style={{paddingTop: 20}}>
                        {readTime} min Read
                    </Grid>
                    <Grid item xs={3} className={classes.summaryValues}>
                        <IconButton aria-label="addToLibrary"
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    style={{color: libraryAdd}}
                                    onClick={handleToggle}>
                            <BookmarkIcon fontSize={"large"}/>
                        </IconButton>

                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow"
                                                      onKeyDown={handleListKeyDown}>
                                                {
                                                    stateCollectionList.map(data =>
                                                        <MenuItem value={data.name}>
                                                            <TextField style={{border: "none", color: "#000"}}
                                                                       aria-disabled={true} onClick={handleAddLibrary}
                                                                       value={data.name}/>
                                                        </MenuItem>
                                                    )
                                                }
                                                <MenuItem><TextField placeholder={"Create new collection"}
                                                                     onKeyPress={handleKeyPress}/></MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>

                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
