import React, {useEffect, useState} from 'react'
import NavBarWP from './navBars/navBarWP';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {alpha, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import Button from "@material-ui/core/Button";
import MoneyOffSharpIcon from '@material-ui/icons/MoneyOffSharp'
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import PresentToAllSharpIcon from '@material-ui/icons/PresentToAllSharp';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import PausePresentationSharpIcon from '@material-ui/icons/PausePresentationSharp';
import MultiSelect from "react-multi-select-component";
import axios from "axios";
import nodeFetch from 'node-fetch';
import {createApi} from 'unsplash-js';
import APIURL from "../API/APIURL";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    editor: {
        paddingTop: 120,
        width: "50%",
        paddingBottom: 30,
        margin: "auto"
    },
    navBar: {
        display: "block",
    },
    optionSection: {
        width: "50%",
        paddingBottom: 100,
        margin: "auto"
    },
    question: {
        marginTop: 20,
        marginBottom: 20,
    },
    buttonPublish: {
        backgroundColor: '#935FF9',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: alpha("#935FF9", 0.70),
        },
        color: 'white',
        width: '15%',
        fontSize: 16,
        marginRight: theme.spacing(2)
    },
    licenceQuestion: {
        // display:"none",
    },
    moreButton: {
        backgroundColor: '#935FF9',
        color: '#fff'
    },
    postTitle: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        fontSize: 30,
        // padding:10,
    },
}));


export default function WriteArticle() {
    const classes = useStyles();
    // TODO where from this userID taken
    const userID = "60ecfe51395a1704a42d8cae";

    let [stateArticleID, setStateArticleID] = useState(window.location.href.split('/').slice(-1)[0]);
    let [stateTagList, setStateTagList] = useState([]);
    let [stateArticleTitle, setStateArticleTitle] = useState("");
    let [stateArticleContent, setStateArticleContent] = useState("<h3>Welcome to EduPulse...</h3><br><br><br>");

    let [stateVisibility, setStateVisibility] = useState("");
    let [stateLQ1, setStateLQ1] = useState(0);
    let [stateLQ2, setStateLQ2] = useState(0);
    let [stateSelectedTags, setStateSelectedTags] = useState([]);

    useEffect(() => {
        if (stateArticleID === "" || stateArticleID === "writeArticle") {
            const urlArticleInitialization = APIURL("write_article/");
            axios.post(urlArticleInitialization, {"author_ID": userID}).then(function (response) {
                setStateArticleID(response.data._id);
            }).catch(function () {
                console.error("load failed");
            })
        } else {
            // load article details for continue editing
            const urlGetArticleData = APIURL("view_article/preview_article");
            axios.post(urlGetArticleData, {"_id": stateArticleID}).then(function (response) {
                setStateArticleTitle(response.data.article.current.title);
                setStateArticleContent(response.data.article.current.content);
                console.log(response.data.article.current)
            }).catch(function () {
                console.error("load failed");
            })
            // make post unpublished
            const urlMakePostUnpublished = APIURL("write_article/make_state_unpublished");
            axios.post(urlMakePostUnpublished, {"_id": stateArticleID}).then(function (response) {
                console.log("Make post unpublished")
            }).catch(function () {
                console.error("load failed");
            })
        }
    }, []);

    console.info("after: ", stateArticleContent, stateArticleTitle, stateArticleID)

    // load tags
    const urlGetTags = APIURL("tag_operation/");
    useEffect(() => {
        axios.get(urlGetTags).then(function (response) {
            let i = 0;
            let tags = [];
            response.data.map(data => {
                tags[i++] = {label: data.verbose, value: data._id};
            })
            setStateTagList(tags);
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlGetTags]);

    // real time save
    const urlRealTimeSave = APIURL("write_article/real_time_content_save/");
    useEffect(() => {
        let postInfo = {
            "post_ID": stateArticleID,
            "post_title": stateArticleTitle,
            "post_content": stateArticleContent
        };
        axios.post(urlRealTimeSave, postInfo).then(function () {
            console.log("article saved")
        }).catch(function () {
            console.error("load failed");
        })
    }, [stateArticleContent, stateArticleTitle]);

    // events
    // handle title changes
    const handleTitleChange = event => {
        setStateArticleTitle(event.target.value);
    };
    const handleVisibilityChange = event => {
        setStateVisibility(event.target.value);
    };
    const handleQ1Change = event => {
        setStateLQ1(event.target.value);
    };
    const handleQ2Change = event => {
        setStateLQ2(event.target.value);
    };
    const handleTagSelection = (selectedList, selectedItem) => {
        setStateSelectedTags(selectedList)
    }

    // alert box function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = event => {
        // close alert box
        setOpen(false);

        // check all are filed
        if (stateVisibility !== "" && stateLQ1 !== 0 && stateLQ2 !== 0 && stateArticleTitle !== "" && stateArticleContent !== "") {
            // decide licence
            let licence = "";
            switch (stateLQ1 + "0" + stateLQ2) {
                case "101":
                    licence = "by";
                    break
                case "102":
                    licence = "by-nc"
                    break;
                case "201":
                    licence = "by-sa"
                    break;
                case "202":
                    licence = "by-nc-sa";
                    break;
                case "301":
                    licence = "by-nd";
                    break;
                case "302":
                    licence = "by-nc-nd"
                    break;
                default:
                    licence = "by";
            }
            //get tagID list
            // tagList.
            let tagIDList = [];
            let i = 0;
            stateSelectedTags.map(item => tagIDList[i++] = (item.value))
            // generate cover image
            const unsplash = createApi({
                accessKey: '1BUdbzubiRw5_iYRYdYdth_ud40ySWBVwPtUgSjWTME',
                fetch: nodeFetch,
            });
            // get random key for search an image
            let key = stateSelectedTags[Math.round(Math.random() * (tagIDList.length - 1))].label;
            // call unsplash api for take a random image based on key
            unsplash.photos.getRandom({query: key, count: 1,}).then(function (response) {
                let imageURL = response.response[0].urls.regular;
                // update database
                let postData = {
                    "post_ID": stateArticleID,
                    "post_title": stateArticleTitle,
                    "post_content": stateArticleContent,
                    "post_visibility": stateVisibility,
                    "post_licence": licence,
                    "cover_image": imageURL,
                    "related_tags": tagIDList,
                    "contributor": userID,
                }

                axios.post(APIURL("write_article/publish_post/"), postData).then(function (response) {
                    console.log("article published s1")
                    // call version API
                    axios.post(APIURL("write_article/publish_post_version/"), postData).then(function (response) {
                        console.log("article published s2")
                        // redirect to the article view
                        window.location.href = "/components/academicUser/viewArticle/" + stateArticleID
                    }).catch(function () {
                        console.error("publish failed");
                    })
                }).catch(function () {
                    console.error("publish failed");
                })
            });
        }
    }

    // set local storage variable to store post ID
    localStorage.setItem('postID', stateArticleID);
    return (
        <div>
            <NavBarWP className={classes.navBar}/>

            <div align="center" className={classes.editor}>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Title" variant="outlined" multiline rows={3}
                               className={classes.postTitle}
                               onChange={handleTitleChange}
                               value={stateArticleTitle}
                    />
                </form>

                <CKEditor
                    style={{height: 100}}
                    editor={ClassicEditor}
                    data={stateArticleContent}
                    onChange={(event, editor) => {
                        setStateArticleContent(editor.getData())
                    }}
                />
            </div>

            <div className={classes.optionSection}>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Select tags:
                </Typography>
                <FormControl style={{minWidth: 200}}>
                    <MultiSelect options={stateTagList} onChange={setStateSelectedTags} value={stateSelectedTags}
                                 labelledBy="Select" style={{fontSize: 15}}/>
                </FormControl>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Who can see this post?
                </Typography>
                <FormControl>
                    <Select
                        id="demo-customized-select-visibility"
                        onChange={handleVisibilityChange}
                        required
                    >
                        <MenuItem value={"Anyone"} defaultChecked><PublicSharpIcon/> &nbsp; Anyone</MenuItem>
                        <MenuItem value={"Academics Only"}><PeopleSharpIcon/> &nbsp; Academics Only</MenuItem>
                        {/*<MenuItem value={"Within University Only"}><SchoolSharpIcon/> &nbsp; Within University*/}
                        {/*    Only</MenuItem>*/}
                    </Select>
                </FormControl>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Allow adaptations of your work to be shared?
                </Typography>
                <FormControl>
                    <Select
                        id="demo-customized-select-q1"
                        onChange={handleQ1Change}
                        required
                    >
                        <MenuItem value={"1"} defaultChecked={true}><PresentToAllSharpIcon/> &nbsp; Yes</MenuItem>
                        <MenuItem value={"2"}><PausePresentationSharpIcon/> &nbsp; Yes, But re-publish under the same
                            terms</MenuItem>
                        <MenuItem value={"3"}><CancelPresentationSharpIcon/> &nbsp; No</MenuItem>
                    </Select>
                </FormControl>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Allow commercial uses of your work?
                </Typography>
                <FormControl>
                    <Select
                        id="demo-customized-select-q2"
                        onChange={handleQ2Change}
                        required
                    >
                        <MenuItem value={"1"} defaultChecked={true}><AttachMoneySharpIcon/> &nbsp; Yes</MenuItem>
                        <MenuItem value={"2"}><MoneyOffSharpIcon/> &nbsp; No</MenuItem>
                    </Select>
                </FormControl>

                <div style={{textAlign: "center", marginTop: 50}}>
                    <div>
                        <Button variant="contained" className={classes.buttonPublish} onClick={handleClickOpen}>
                            Publish
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Declaration</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    I declare that this content is originally mine and I have not copied from anywhere.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={handleSubmit} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
