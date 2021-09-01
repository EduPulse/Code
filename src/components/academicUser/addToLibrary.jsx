import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, TextField} from "@material-ui/core";
import axios from "axios";
import APIURL from "../API/APIURL";

export default function AddToLibrary({userID, postID}) {
    // disable add to library button
    let [stateIsUserLogIn, setStateIsUserLogIn] = useState(true);
    useEffect(() => {
        if (userID !== "")
            setStateIsUserLogIn(false)
    }, [])

    // library operation
    let [stateCollectionList, setStateCollectionList] = useState([]);

    // check post already in library
    const urlAvailability = APIURL("add_to_library/is_available_at_library");
    useEffect(() => {
        let dataForAvailability = {
            "post_ID": postID,
            "user_ID": userID,
        };
        if (userID !== "")
            axios.post(urlAvailability, dataForAvailability).then(function (response) {
                if (response.data.post_available)
                    setLibraryAdd("#935FF9")
            }).catch(function () {
                console.error("collection availability check failed");
            })
    }, [urlAvailability]);

    // list out collections
    const getAllCollection = APIURL("add_to_library/get_collection_list");
    useEffect(() => {
        if (userID !== "")
            axios.post(getAllCollection, {"user_ID": userID}).then(function (response) {
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
            let urlWriteComment = APIURL("add_to_library/create_collection_save_post");
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
        let urlAddToSelectedLibrary = APIURL("add_to_library/save_post");
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
        <div>
            <IconButton aria-label="addToLibrary"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        style={{color: libraryAdd}}
                        disabled={stateIsUserLogIn}
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

        </div>
    );
}
