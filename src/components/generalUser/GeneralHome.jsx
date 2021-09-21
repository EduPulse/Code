import React, { useEffect, useState } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import PostListing from "./subComponents/postListing";
import Skeleton from "@material-ui/lab/Skeleton";
import AddListing from "./subComponents/addListing";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PostListingPin from "./subComponents/postListingPin";
import AcademicHomeTags from "./subComponents/academicHomeTags";
import APIURL from "../API/APIURL";
import { user } from "../auth/auth"

import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
//import { TextFieldsOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Collapse from '@material-ui/core/Collapse';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
// import axios from 'axios';
import swal from 'sweetalert';
// import Signup2 from './SignupModal2';


import { BrowserRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';
// const useStyles = makeStyles((theme) => ({ 
// }));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        marginTop: '80px',
        width: '95%'
    },
    //modal css from here
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '300px',
        // margin: '20px 0'
    },
    formTitleContainer: {
        backgroundColor: '#4411A8',
        width: '80%',
        marginTop: '10px',
        borderRadius: '5px',
        padding: '5px 5px',
        marginBottom: '20px',

    },
    formTitle: {
        color: 'white'
    },
    textfield: {
        margin: theme.spacing(1, 2, 1, 0)
    },
    formControl: {
        margin: theme.spacing(1, 0),
        minWidth: 250,
    },
    formControl1: {
        margin: theme.spacing(1, 0),
        width: 300,
    },
    newad: {
        // marginTop: '20px',
        borderRadius: '50px',
        backgroundColor: 'green'
    },
    button: {
        margin: theme.spacing(1),
        // justifyContent: 'center',
        // align:"center"
    }
}));

function SkeletonView() {
    let v = [1, 2, 3]
    return (
        v.map(() =>
            <Card style={{ width: 320, height: 467, margin: 10, }}>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    }
                    title={
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    }
                    subheader={<Skeleton animation="wave" height={10} width="40%" />}
                />
                <Skeleton animation="wave" variant="rect" style={{ paddingTop: '56.25%' }} />

                <CardContent>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                </CardContent>
            </Card>
        )
    );
}

export default function GeneralHome() {

    const classes = useStyles();

    let newUser = window.location.href.split('/').slice(-1)[0];
    console.log(newUser);
    const [open, setOpen] = useState(newUser == 'new' ? true : false);
    const [checked, setChecked] = useState(false);
    const [institutes, setInstitutes] = useState([])
    const [signupForm, setSignupForm] = useState({
        userID: '',
        userType: '',
        uniName: '',
        facName: '',
        acaEmail: '',
        acaRole: ''
    })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setChecked(false);
    };

    const handleChange = e => {
        setSignupForm(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleRoleChange = e => {
        setSignupForm(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
        if (e.target.name == 'userType' && e.target.value == 'Yes') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    const url_loogedInUser = "http://localhost:9000/api/Signup/getInstitutes";
    useEffect(() => {
        axios.get(url_loogedInUser).then(function (response) {
            setInstitutes(response.data);
            console.log(response.data);
        }).catch(function () {
            console.error("Institutes loading failed");
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const user_ID = '60ecfe51395a1704a42d8cae';
        let item = {
            "userID": userID,
            "userType": signupForm.userType,
            "uniName": signupForm.uniName,
            "facName": signupForm.facName,
            "acaEmail": signupForm.acaEmail,
            "acaRole": signupForm.acaRole
        }
        console.log(item);
        const urlUpdateUser = "http://localhost:9000/api/Signup/role";
        axios.post(urlUpdateUser, item).then(function (response) {
            // swal("saved successfully", "", "success");
            console.log(response)
            setSignupForm({
                userType: '',
                uniName: '',
                facName: '',
                acaEmail: '',
                acaRole: ''
            })
        })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }

    //modal 2
    const [open1, setOpen1] = useState(false);
    const history = useHistory();

    const handleOpen1 = () => {
        // props.onCloseModal();
        handleClose();
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    // const classes = useStyles();
    const [signup1, setSignup1] = useState({
        userID: '',
        gender: '',
        birthday: ''
    })

    const handleChange1 = e => {
        setSignup1(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit1 = (e) => {
        e.preventDefault();

        // const user_ID = '60ecfe51395a1704a42d8cae';
        let item = {
            "userID": userID,
            "gender": signup1.gender,
            "birthday": signup1.birthday
        }
        console.log(item);
        const urlUpdateUser = "http://localhost:9000/api/Signup/perDetails";
        axios.post(urlUpdateUser, item).then(function (response) {
            swal("Registered successfully", "", "success");
            console.log(response)
            setSignup1({
                userID: '',
                gender: '',
                brithday: ''
            })
        })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }

    //Home from here onwords
    let userID = ""
    let userRole = "";
    if (user()) {
        userID = user()._id;
        userRole = user().role;
    }
    console.log(userID);
    console.log(userRole);
    // TODO remove after dev
    // userID = "60ed8d6597a4670ca060ed6b";
    let tagSearchID = window.location.href.split('/').slice(-1)[0];

    const [statePostData, setStatePostData] = useState([]);
    const [statePostDataAcademic, setStatePostDataAcademic] = useState([]);
    const [statePostDataGeneral, setStatePostDataGeneral] = useState([]);
    const [statePostDataFallow, setStatePostDataFallow] = useState([]);
    const [statePostDataFallowTag, setStatePostDataFallowTag] = useState([]);
    useEffect(() => {
        // search by tag
        if (tagSearchID !== "" && window.location.href.split('/').slice(-2)[0] === "tagLookup") {
            axios.post(APIURL("home_function/search_by_tag"), { tag_ID: tagSearchID }).then(function (response) {
                setStatePostData(response.data);
            }).catch(function () {
                console.error("load failed");
            })
        } else {
            // login user content
            if (userID !== "") {
                // academic only content
                // if (userRole === "academic")
                //     axios.get(APIURL("home_function/academic_content")).then(function (response) {
                //         setStatePostDataAcademic(response.data);
                //     }).catch(function () {
                //         console.error("load failed");
                //     })
                // followers latest articles
                axios.post(APIURL("home_function/get_post_form_followers"), { user_ID: userID }).then(function (response) {
                    setStatePostDataFallow(response.data);
                }).catch(function () {
                    console.error("load failed");
                })
                // following tag latest
                axios.post(APIURL("home_function/get_post_form_following_tags"), { user_ID: userID }).then(function (response) {
                    setStatePostDataFallowTag(response.data);
                }).catch(function () {
                    console.error("load failed");
                })
            }
            // anyone type content
            axios.get(APIURL("home_function/non_login_content")).then(function (response) {
                setStatePostDataGeneral(response.data);
            }).catch(function () {
                console.error("load failed");
            })

        }
    }, []);

    useEffect(() => {
        let newList = []
        // statePostDataAcademic.map(data => newList.push(data))
        statePostDataGeneral.map(data => newList.push(data))
        statePostDataFallow.map(data => newList.push(data))
        statePostDataFallowTag.map(data => newList.push(data))

        // remove duplicates
        let check = new Set();
        let uniqueData = newList.filter(obj => !check.has(obj["_id"]) && check.add(obj["_id"]))

        setStatePostData(uniqueData)

    }, [statePostDataAcademic, statePostDataGeneral, statePostDataFallow])


    // add listing
    const [stateAddData, setStateAddData] = useState([]);
    const urlAddData = APIURL("home_function/get_adds");
    useEffect(() => {
        axios.get(urlAddData).then(function (response) {
            setStateAddData(response.data);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

     // final post rendering list
     let renderingPostList = []
     // get feasible add count
     let addCountFeasible = Math.ceil(statePostData.length / 15);
     let i = 0;
     let postIndex = 0;
     let addIndex = 0;
     const k = addCountFeasible + statePostData.length;
     while (i < k) {
         if (Math.random() < 0.2 && addCountFeasible > addIndex) {
             renderingPostList.push([false, stateAddData[Math.round(Math.random() * (stateAddData.length - 1))]])
             addIndex++
         } else {
             if (statePostData[postIndex])
                 renderingPostList.push([true, statePostData[postIndex++]])
         }
         i++;
     }

    // const [renderingPostList, setRenderingPostList] = useState([]);
    // useEffect(() => {
    //     // final post rendering list
    //     let renderingPostList1 = [];
    //     // get feasible add count
    //     let addCountFeasible = Math.ceil(statePostData.length / 10);
    //     let i = 0;
    //     let postIndex = 0;
    //     let addIndex = 0;
    //     const k = addCountFeasible + statePostData.length;
    //     while (i < k) {
    //         if (Math.random() < 0.2 && addCountFeasible > addIndex) {
    //             renderingPostList1.push([false, stateAddData[Math.round(Math.random() * (stateAddData.length - 1))]])
    //             addIndex++
    //         } else {
    //             if (statePostData[postIndex])
    //                 renderingPostList1.push([true, statePostData[postIndex++]])
    //         }
    //         i++;
    //     }
    //     setRenderingPostList(renderingPostList1);
    // }, [stateAddData, statePostData]);

    // const classes = useStyles();
    return (
        <div>
            <div align="center">
                <Grid container spacing={2} className={classes.mainGrid}>

                    <Grid item xs={3} style={{ float: "left" }}>
                        <Typography variant={"h5"} style={{ textAlign: "center" }}>Trending Tags</Typography>
                        <AcademicHomeTags />

                    </Grid>

                    <Grid item xs={9}>
                        <Grid container spacing={3} style={{ display: "flex" }}>
                            {renderingPostList.length ? (
                                renderingPostList.map(item => (

                                    item[0] ? (
                                        item[1].type !== "pin" ? (
                                            <PostListing
                                                userID={userID}
                                                authorID={item[1].author._id}
                                                postID={item[1]._id}
                                                title={item[1].article.current.title}
                                                author={item[1].author.name}
                                                authorPP={item[1].author.profilePicture}
                                                publishedData={item[1].createdAt}
                                                coverImage={item[1].article.current.coverImage}
                                                likes={item[1].article.upvotes}
                                                viewCount={item[1].viewCount}
                                                readTime={item[1].article.current.readTime}
                                            />
                                        ) : (
                                            console.log(item[1])
                                            // <PostListingPin originalPostID={item[1].pin.originalPost._id}
                                            //     title={item[1].pin.originalPost.article.current.title}
                                            //     authorID={item[1].author._id} authorName={item[1].author.name}
                                            //     coverImage={item[1].pin.originalPost.article.current.coverImage}
                                            //     publishedData={item[1].createdAt}
                                            //     pinMessage={item[1].pin.pinComment} />
                                        )
                                    ) : (
                                        item[1] ? (
                                            <AddListing publicName={item[1].publicName}
                                                media={item[1].advertisements[0].Media}
                                                mediaType={item[1].advertisements[0].type}
                                                link={item[1].advertisements[0].redirectLink}
                                                email={item[1].contactDetails.email}
                                                description={item[1].advertisements[0].Description} />
                                        ) : (
                                            SkeletonView()
                                        )
                                    )

                                ))
                            ) : (
                                SkeletonView()
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                disableBackdropClick
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4>Are you related to Academics ?</h4>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Select Answer</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Advertisment type"
                                        name="userType"
                                        onChange={handleRoleChange}
                                        defaultValue={"No"}
                                    >
                                        <MenuItem value={"Yes"} defaultValue>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <Collapse in={checked}>
                                <h4>Acdemic Details</h4>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControl1}>
                                        <InputLabel id="demo-simple-select-outlined-label">University</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Select University"
                                            name="uniName"
                                            onChange={handleChange}
                                            defaultValue={""}
                                        >
                                            {institutes.map(institute =>
                                                <MenuItem value={institute._id}>{institute.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-full-width"
                                        label="Academic Email"
                                        placeholder="Placeholder"
                                        fullWidth variant="outlined"
                                        className={classes.textfield}
                                        value={signupForm.acaEmail}
                                        name="acaEmail"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControl} >
                                        <InputLabel id="demo-simple-select-outlined-label">Academic Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Select Academic Role"
                                            name="acaRole"
                                            onChange={handleChange}
                                            defaultValue={""}
                                            style={{ width: '250px' }}
                                        >
                                            <MenuItem value={"undergraduate"} defaultValue>Undergraduate</MenuItem>
                                            <MenuItem value={"staff"}>staff</MenuItem>
                                            <MenuItem value={"lecturer"}>lecturer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Collapse>

                            <div style={{ display: 'flex', justifyContent: 'center' }} onclick={handleClose}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // startIcon={<CloudUploadIcon/>}
                                    onClick={handleOpen1}
                                    // onClick={props.onClick}
                                    type="submit"
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open1}
                onClose={handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open1}>
                    <div className={classes.paper}>

                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit1}>

                            {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className={classes.formTitleContainer}>
                                    <h2 className={classes.formTitle} align="center">Details</h2>
                                </div>
                            </div> */}

                            <h4>Personal Details</h4>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Gender"
                                        name="gender"
                                        onChange={handleChange1}
                                        defaultValue={""}
                                    >
                                        <MenuItem value={"Male"} defaultValue>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <TextField
                                        id="datetime-local"
                                        label="Birthday"
                                        type="date"
                                        fullWidth variant="outlined"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="birthday"
                                        onChange={handleChange1}
                                    />
                                </FormControl>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link to="/components/generalUser">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        // startIcon={<CloudUploadIcon/>}
                                        onClick={handleClose1}
                                        type="submit"
                                    >
                                        Next
                                    </Button>
                                </Link>
                            </div>

                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>

    )
}
