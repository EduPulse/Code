import React, {useEffect, useState} from 'react'
import NavBarWP from './navBarWP';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {alpha, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import SchoolSharpIcon from '@material-ui/icons/SchoolSharp';
import Button from "@material-ui/core/Button";
import MoneyOffSharpIcon from '@material-ui/icons/MoneyOffSharp'
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import PresentToAllSharpIcon from '@material-ui/icons/PresentToAllSharp';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import PausePresentationSharpIcon from '@material-ui/icons/PausePresentationSharp';
import Multiselect from 'multiselect-react-dropdown';
import {Link} from "react-router-dom";
import axios from "axios";

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
    dropdown: {
        marginLeft: 40,
        marginTop: -10,
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
    postTitle:{
        marginTop:20,
        marginBottom:20,
        width:"100%",
        fontSize:30,
        // padding:10,
    },
}));

export default function WriteArticle() {
    const classes = useStyles();
    const userID = "60ecfe51395a1704a42d8cae";

    let [stateArticleID, setStateArticleID] = useState(window.location.href.split('/').slice(-1)[0]);
    let [stateTagList, setStateTagList] = useState([]);
    let [stateArticleTitle, setStateArticleTitle] = useState("");
    let [stateArticleContent, setStateArticleContent] = useState("<h3>Welcome to EduPulse...</h3><br><br><br>");


        // for any circumstance run either 1 or 2
        console.log(stateArticleID);
        // {1} article initialization only if new edit
        const urlArticleInitialization = "http://localhost:9000/write_article/";
        let postInfo = {"author_ID": userID};
        useEffect(() => {
            if(stateArticleID==="" || stateArticleID==="writeArticle"){
                axios.post(urlArticleInitialization, postInfo).then(function (response) {
                    setStateArticleID(response.data._id);
                }).catch(function () {
                    console.error("load failed");
                })
            }
        }, []);

        // {2} get article data only on editing article
        const urlGetArticleDats = "http://localhost:9000/view_article/";
        postInfo = {"_id": stateArticleID};
        useEffect(() => {
            if(!(stateArticleID==="" || stateArticleID==="writeArticle")) {
                console.log("work hear");
                axios.post(urlGetArticleDats, postInfo).then(function (response) {
                    setStateArticleTitle(response.data.article.versions[0].title);
                    setStateArticleContent(response.data.article.versions[0].content);
                }).catch(function () {
                    console.error("load failed");
                })
            }
        }, []);


    // load tags
    const urlGetTags = "http://localhost:9000/tag_operation/";
    useEffect(() => {
        axios.get(urlGetTags).then(function (response) {
            let i=0;
            let tags=[];
            response.data.map(data=>{
                tags[i++]=data.verbose;
            })
            setStateTagList(tags);
        }).catch(function () {
            console.error("load failed");
        })
    }, [urlGetTags]);

    // real time save
     const urlRealTimeSave = "http://localhost:9000/write_article/real_time_content_save/";
    postInfo = {
        "post_ID": stateArticleID,
        "post_title":stateArticleTitle,
        "post_content":stateArticleContent
    };
        useEffect(() => {
            axios.post(urlRealTimeSave, postInfo).then(function (response) {
                console.log("article saved")
            }).catch(function () {
                console.error("load failed");
            })
        }, [stateArticleID,stateArticleContent]);

    // events
    // handle title changes
    const handleTitleChange = event => {
        setStateArticleTitle(event.target.value);
    };
    return (
        <div>
            <NavBarWP className={classes.navBar}/>

            <div align="center" className={classes.editor}>

                <form className={classes.root} noValidate autoComplete="off">
                    {console.log(stateArticleTitle)}
                    <TextField id="outlined-basic" label="Title" variant="outlined" multiline rows={3} className={classes.postTitle}
                               onChange={handleTitleChange}
                               value={stateArticleTitle}
                    />
                </form>

                    <CKEditor
                    style={{height:100}}
                    editor={ClassicEditor}
                    data={stateArticleContent}
                    // onReady={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(event, editor) => {
                        setStateArticleContent(editor.getData())
                    }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                />
            </div>

            <div className={classes.optionSection}>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Select tags:

                </Typography>
                <Multiselect options={stateTagList} isObject={false} selectionLimit={4} style={{fontSize:14,}}/>
                <Typography component="h6" variant="h6" className={classes.question}>

                    Who can see this post?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={10} defaultChecked={true}><PublicSharpIcon/> &nbsp; Anyone</MenuItem>
                            <MenuItem value={20}><PeopleSharpIcon/> &nbsp; Academics Only</MenuItem>
                            <MenuItem value={30}><SchoolSharpIcon/> &nbsp; Within University Only</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Allow adaptations of your work to be shared?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={1} defaultChecked={true}><PresentToAllSharpIcon/> &nbsp; Yes</MenuItem>
                            <MenuItem value={2}><PausePresentationSharpIcon/> &nbsp; Yes, But re-publish under the same terms</MenuItem>
                            <MenuItem value={3}><CancelPresentationSharpIcon/> &nbsp; No</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Allow commercial uses of your work?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={1} defaultChecked={true}><AttachMoneySharpIcon/> &nbsp; Yes</MenuItem>
                            <MenuItem value={2}><MoneyOffSharpIcon/> &nbsp; No</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <br/>
                <Link to={"/components/academicUser/viewArticle"} style={{textDecoration:"none"}}>
                <Button variant="contained" className={classes.buttonPublish}>
                    Publish
                </Button>
                </Link>
                <Link to={"/components/academicUser/search"} style={{textDecoration:"none"}}>
                <Button variant="contained" className={classes.buttonPublish}>
                    Cancel
                </Button>
                </Link>
            </div>
        </div>

    )
}
