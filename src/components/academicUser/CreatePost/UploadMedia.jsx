import React, {useEffect, useState} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {alpha, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
    CircularProgress,
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
import {MultiSelect} from "react-multi-select-component";
import axios from "axios";
import nodeFetch from 'node-fetch';
import {createApi} from 'unsplash-js';
import APIURL from "../../API/APIURL";
import {user} from "../../auth/auth";

const config = require('../../../config/config')

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


export default function UploadMedia() {
    const classes = useStyles();
    let userID = ""
    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
    }

    let [stateTagList, setStateTagList] = useState([]);
    let [stateArticleTitle, setStateArticleTitle] = useState("This is the space for the title...");
    let [stateFile, setStateFile] = useState(null)
    let [stateAcademicInstitute, setStateAcademicInstitute] = useState(null)

    let [stateVisibility, setStateVisibility] = useState("");
    let [stateLQ1, setStateLQ1] = useState(0);
    let [stateLQ2, setStateLQ2] = useState(0);
    let [stateSelectedTags, setStateSelectedTags] = useState([]);

    let [isProcessing, setIsProcessing] = useState(false);

    // get user university
    useEffect(() => {
        axios.post(APIURL("get_user_data/"), {_id: userID}).then(function (response) {
            setStateAcademicInstitute(response.data[0].academicInstitute)
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    // load tags
    useEffect(() => {
        axios.get(APIURL("tag_operation/")).then(function (response) {
            let i = 0;
            let tags = [];
            response.data.map(data => {
                tags[i++] = {label: data.verbose, value: data._id};
            })
            setStateTagList(tags);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

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
        // enable progress
        setIsProcessing(true);

        // check all are filed
        if (stateVisibility !== "" && stateLQ1 !== 0 && stateLQ2 !== 0 && stateArticleTitle !== "" && stateFile !== null) {
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
                accessKey: config.clients.unsplash.access_key,
                fetch: nodeFetch,
            });
            // get random key for search an image
            let key = stateSelectedTags[Math.round(Math.random() * (tagIDList.length - 1))].label;
            // call unsplash api for take a random image based on key
            unsplash.photos.getRandom({query: key, count: 1,}).then(function (response) {
                let imageURL = response.response[0].urls.regular;

                // call upload API
                const formData = new FormData();
                formData.append("media", stateFile, stateFile.name);
                axios({
                    method: "post",
                    url: APIURL("publish_media/upload_media_file"),
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"}
                })
                    .then(function (response) {

                        let fileFormat = (stateFile.type.split('/')[0])
                        if (fileFormat === "application")
                            fileFormat = "raw"

                        // TODO config change url
                        const resourceURL = "https://res.cloudinary.com/edupulse/" + fileFormat.toLowerCase() + "/upload/v1631097533/" + response.data.public_id;

                        let content = JSON.stringify({
                            "file_format": stateFile.name.split('.').slice(-1)[0],
                            "basic_url": response.data.public_id,
                            "file_class": stateFile.type.split('/')[0],
                            "full_url": resourceURL
                        })

                        let postData = {
                            "post_title": stateArticleTitle,
                            "content_url": content,
                            "post_visibility": stateVisibility,
                            "post_licence": licence,
                            "cover_image": imageURL,
                            "related_tags": tagIDList,
                            "author_ID": userID,
                            "academic_institute": stateAcademicInstitute
                        }

                        axios.post(APIURL("publish_media/initiate_publication/"), postData).then(function (response) {
                            console.log("article published initiate.")
                            const postID = response.data._id;
                            let postDataVersion = {
                                "post_ID": postID,
                                "post_title": stateArticleTitle,
                                "content_url": content,
                                "cover_image": imageURL,
                                "related_tags": tagIDList,
                                "author_ID": userID
                            }
                            axios.post(APIURL("publish_media/publish_media_version/"), postDataVersion).then(function (response) {
                                // stop displaying progress
                                setIsProcessing(false);
                                console.log("article published.")
                                // redirect to the article view
                                window.location.href = "/components/academicUser/viewArticle/" + postID;
                            }).catch(function () {
                                console.error("publish failed");
                            })
                        }).catch(function () {
                            console.error("publish failed");
                        })
                        // set post data

                    })
                    .catch(function (err) {
                        console.log("Upload resource failed. Try again.")
                    });
            });
        }
    }

    // event file upload
    const handleFileChange = ([file]) => {
        file && setStateFile(file)
        // console.log(file.name.split('.').slice(-1)[0]);
    }


    return (
        <div>
            <div align="center" className={classes.editor}>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Title" variant="outlined" multiline rows={3}
                               className={classes.postTitle}
                               onChange={handleTitleChange}
                               value={stateArticleTitle}
                    />
                </form>

                <DropzoneArea
                    onChange={handleFileChange}
                    // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'video/mp4', 'video/mkv', 'application/pdf', 'application/ppt', 'application/pptx', 'application/doc', 'application/docx']}
                    // maximum file size 250MB
                    maxFileSize={262144000}
                    filesLimit={1}
                    showFileNamesInPreview={true}
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
                        <br/>
                        {
                            isProcessing ? (
                                <div style={{margin: 40}}>
                                    <CircularProgress/>
                                </div>
                            ) : (
                                <span/>
                            )
                        }

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Declaration"}</DialogTitle>
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
