import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardContent, Grid, makeStyles, TextField, Typography,} from '@material-ui/core';
import axios from 'axios';
import Post from './Post'
import Modal from 'react-modal';
import Swal from 'sweetalert2'

import AuthorBasicDetails from './AuthorBasicDetails';
import ScoailProfilesBar from './ScoailProfilesBar';
import APIURL from '../API/APIURL'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '77%',
        marginLeft: 150,
        borderRadius: 5,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginBottom: '10px',
        // marginLeft: '20px',
        width: 80,
        height: 80,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    morevertStyles: {
        color: '#4411A8',
        marginLeft: '5px',
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        marginTop: 30,
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '20px'
    },
    linkStyles: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#FFFFFF',
            textDecoration: 'none',
        }
    },
    typographyStyle: {
        textAlign: 'center',
        fontSize: '16px'
    },
    title: {
        textAlign: 'center',
        // fontFamily: 'Courgette',
        color: '#4411A8',
    },
    secondGrid: {
        marginTop: 10,
        // marginLeft: 15,
    },
    modalStyles: {
        width: '150px',
        marginLeft: '800px',
        marginTop: '250px'
    },
    modalTextStyle: {
        marginLeft: '20px'
    },
    followBtn: {
        backgroundColor: '#935FF9',
        color: '#FFFFFF',
        width: '150px',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '45px',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
    },
    reportBtn: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginRight: '20px',
        marginLeft: '10px',
        marginTop: '10px',
        marginBottom: '10px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#A50000',
        },
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#4411A8',
    },
    modlaLabel: {
        fontSize: '20px',
        marginBottom: '10px'
    },
    modalInput: {
        marginRight: '20px',
        width: '550px',
        marginBottom: '20px',
        borderRadius: '4px',
    },
    modalCancelBtn: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        width: '150px',
        marginTop: '20px',
        marginBottom: '10px',
        marginLeft: '10px',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
    },
    modalReportBtn: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginRight: '20px',
        marginLeft: '130px',
        marginTop: '20px',
        marginBottom: '10px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#A50000',
        },
    },
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        backgroundColor: '#E1D4FC',
    },
};

function AuthorProfile() {

    // let authorId = window.location.href.split('/').slice(-1)[0];
    const [profileData, setProfileData] = useState([])
    const authorId = '60ecfe51395a1704a42d8cae';
    const userID = "60ed8d6597a4670ca060ed6b";
    const [title, settitle] = useState('');
    const [reason, setReason] = useState('');
    const [reportBtnState, setreportBtnState] = useState(false)

    const userData = {"_id": authorId}
    const url_loogedInUser = APIURL("loggedIn_User");
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
            console.error("Profile loading failed");
        })
    }, []);

    const [postList, setpostList] = useState([])
    const url_getUserPosts = APIURL("loggedIn_User/get_all_publication");
    useEffect(() => {
        axios.post(url_getUserPosts, {user_id: authorId}).then(function (response) {
            if (response.data)
                setpostList(response.data);
        }).catch(function () {
            console.error("Posts loading failed");
        })
    }, []);
    let postCount = 0;
    postList.map(post => postCount = postCount + 1);


    const [follow, setfollow] = useState("");
    const url_checkFOllowing = APIURL("loggedIn_User/get_followAuthor");
    useEffect(() => {
        axios.post(url_checkFOllowing, {"user_ID": userID, "writer_ID": authorId}).then(function (response) {
            if (response.data.is_followed) {
                setfollow("Unfollow")
            } else {
                setfollow("Follow")
            }
        }).catch(function () {
            console.error("Follower checikng failed");
        })
    }, []);

    const displayPosts = postList.map(post => {
        return (
            <Post
                author={profileData.name}
                profilePic={profileData.profilePicture}
                title={post.article.current.title}
                coverImg={post.article.current.coverImage}
                readTime={post.article.current.readTime}
            />
        )
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const handleReport = () => {
        let report = {
            "report_type": "User",
            "report_title": title,
            "report_reason": reason,
            "reported_by": userID,
            "reported_author": authorId,
        }
        console.warn("report", report);
        setModalIsOpen(false);

        const urlReportAuthor = APIURL("author_profile/report_author");
        axios.post(urlReportAuthor, report).then(function (response) {
            setreportBtnState(true);
            Swal.fire({
                icon: 'success',
                title: 'Your report has been recorded successfully',
                timer: 2000
            })
            console.log('Author profile is reported');
        }).catch(function () {
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Something went wrong. Try again later.'
            })
            console.error("Author profile report is failed");
        })
    }

    const handleFollow = () => {

        if (follow === "Follow") {
            console.log("Follow the user")
            const url_followAuthor = APIURL("loggedIn_User/set_followAuthor");
            axios.post(url_followAuthor, {"user_ID": userID, "writer_ID": authorId}).then(function (response) {
                setfollow("Unfollow");
                Swal.fire({
                    icon: 'success',
                    title: 'You are now following this author',
                    timer: 1500
                })
                console.log('Author profile is followed');
            }).catch(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry!',
                    text: 'Something went wrong. Try again later.'
                })
                console.error("Author profile following got failed");
            })
        } else {
            console.log("I want to Unfollow the user")
            const url_unfollowAuthor = APIURL("loggedIn_User/set_unFollowAuthor");
            axios.post(url_unfollowAuthor, {"user_ID": userID, "writer_ID": authorId}).then(function (response) {
                setfollow("Follow");
                Swal.fire({
                    icon: 'success',
                    title: 'You unfollowed this author',
                    timer: 1500
                })
                console.log('Author profile is unfollowed');
            }).catch(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry!',
                    text: 'Something went wrong. Try again later.'
                })
                console.error("Author profile unfollowing got failed");
            })
        }
    }

    return (
        <div>
            <div>
                <Card className={useStyles().root}>

                    <CardContent>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Avatar alt="Profile image" className={useStyles().avatar}
                                        src={profileData.profilePicture}/>
                            </Grid>
                        </Grid>

                        <Typography gutterBottom variant="h5" component="h2" className={useStyles().title}>
                            {profileData.name}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p"
                                    className={useStyles().typographyStyle}>
                            <p>{profileData.bio}</p>
                            {/* <p>{university}</p> */}
                            <p>{profileData.faculty}</p>
                        </Typography>

                        <ScoailProfilesBar
                            // authorId = {authorId}
                        />

                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Button className={useStyles().followBtn} onClick={handleFollow}>{follow}</Button>
                            </Grid>
                            <Grid item>
                                <Button disabled={reportBtnState} className={useStyles().reportBtn}
                                        onClick={openModal}>Report</Button>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <Grid>
                        <Grid item alignContent="center">
                            <h2 className={useStyles().modalTitle}>Report the author</h2>
                        </Grid>
                    </Grid>
                    <Grid>
                        <form>
                            <Grid item>
                                <label className={useStyles().modlaLabel}>Title*</label>
                                <TextField className={useStyles().modalInput} required value={title} onChange={(e) => {
                                    settitle(e.target.value)
                                }}/>
                            </Grid>
                            <Grid item>
                                <label className={useStyles().modlaLabel}>Reason*</label>
                                <TextField className={useStyles().modalInput} required value={reason} onChange={(e) => {
                                    setReason(e.target.value)
                                }}/>
                            </Grid>
                            <Grid item>
                                <Button className={useStyles().modalReportBtn} onClick={handleReport}>Report</Button>
                                <Button className={useStyles().modalCancelBtn} onClick={closeModal}>Cancel</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Modal>

            </div>

            <div>
                <Grid className={useStyles().secondGrid} container spacing={3} justifyContent="center">
                    <Grid item>
                        <AuthorBasicDetails
                            postCount={postCount}
                        />
                    </Grid>

                    <Grid item>
                        {displayPosts}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AuthorProfile
