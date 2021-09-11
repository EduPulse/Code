import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, Divider, Grid, makeStyles, Typography} from '@material-ui/core';
import axios from 'axios';
import Post from './Post'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '60%',
        marginLeft: 275,
        borderRadius: 30,
    },
    avatar: {
        backgroundColor: '#935FF9',
        marginBottom: '20px',
        marginLeft: '20px',
        width: 80,
        height: 80,
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
        marginLeft: 15,
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
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        width: '150px',
        marginTop: '20px',
        marginBottom: '10px',
        marginLeft: '80px',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
    },
    reportBtn: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginRight: '20px',
        marginLeft: '10px',
        marginTop: '20px',
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
    }
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px'
    },
};

function AuthorProfile() {

    let authorId = window.location.href.split('/').slice(-1)[0];
    const [profileData, setProfileData] = useState([])
    // const authorId = '60ecfe51395a1704a42d8cae';
    const userData = {"_id": authorId}
    const url_loogedInUser = "http://localhost:9000/loggedIn_User";
    useEffect(() => {
        axios.post(url_loogedInUser, userData).then(function (response) {
            setProfileData(response.data);
        }).catch(function () {
        console.error("Profile loading failed");
        })
    }, []);

    const [postList, setpostList] = useState([])
    const url_getUserPosts = "http://localhost:9000/loggedIn_User/get_all_publication";
    useEffect(() => {
        axios.post(url_getUserPosts, {user_id: authorId}).then(function (response) {
            if (response.data)
                setpostList(response.data);
        }).catch(function () {
        console.error("Posts loading failed");
        })
    }, []);
    let postCount = 0;
    postList.map(post => postCount = postCount + 1 );

    const displayPosts = postList.map (post => {
        return (
            <Post
                author = {profileData.name}
                profilePic = {profileData.profilePicture}
                title = {post.article.current.title}
                coverImg = {post.article.current.coverImage}
                readTime = {post.article.current.readTime}
            />
        )
    })

    const [tagstList, settagsList] = useState([])
    const url_getUserTags = "http://localhost:9000/loggedIn_User/get_all_tags";
    useEffect(() => {
        axios.post(url_getUserTags, {user_id: authorId}).then(function (response) {
            if (response.data)
                settagsList(response.data);
        }).catch(function () {
        console.error("Tags loading failed");
        })
    }, []);
    let tagsCount = 0;
    tagstList.map(tag => tagsCount = tagsCount + 1 );

    const [followingUsers, setfollowingUsers] = useState([])
    const url_getFollowingUsers = "http://localhost:9000/loggedIn_User/get_followingUsers";
    useEffect(() => {
        axios.post(url_getFollowingUsers, {user_id: authorId}).then(function (response) {
            if (response.data)
            setfollowingUsers(response.data);
        }).catch(function () {
        console.error("Following Users loading failed");
        })
    }, []);
    let followingUserCount = 0;
    followingUsers.map(followingUser => followingUserCount = followingUserCount + 1 );

    const [followedBy, setfollowedBy] = useState([])
    const url_getFollowedBy = "http://localhost:9000/loggedIn_User/get_followedBy";
    useEffect(() => {
        axios.post(url_getFollowedBy, {user_id: authorId}).then(function (response) {
            if (response.data)
                setfollowedBy(response.data);
        }).catch(function () {
        console.error("Followed By loading failed");
        })
    }, []);
    let followedByCount = 0;
    followedBy.map(follower => followedByCount = followedByCount + 1 );

    // const [modalOpen, setmodalOpen] = useState(false);
    // const handleOpenModal = () => {
    //     setmodalOpen(true);
    // }
    // const handleCloseModal = () => {
    //     setmodalOpen(false);
    // }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    const userID = "60ed8d6597a4670ca060ed6b";
    const [title, settitle] = useState('');
    const [reason, setReason] = useState('');
    //useEffect(() => { setReason(userAcaMail) }, [userAcaMail]);
    
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

        const urlReportAuthor = "http://localhost:9000/author_profile/report_author";
        axios.post(urlReportAuthor, report).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Your report has been recorded successfully',
                timer: 1500
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
                            {/* <IconButton onClick={handleOpenModal}>
                                <MoreVertIcon className={useStyles().morevertStyles} />
                            </IconButton> */}
                            {/* <Modal
                                open={modalOpen}
                                onClose={handleCloseModal}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <div className={useStyles().modalStyles} >
                                    <Card>
                                        <Button> Follow author </Button>
                                        <Divider />
                                        <Button > Report author </Button>
                                    </Card>
                                </div>
                            </Modal> */}
                        </Typography>
                            
                        <Typography variant="body2" color="textSecondary" component="p"
                                    className={useStyles().typographyStyle}>
                            <p>{profileData.bio}</p>
                            {/* <p>{university}</p> */}
                            <p>{profileData.faculty}</p>
                        </Typography>
                        
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item>
                                <Button className={useStyles().followBtn}>Follow</Button>
                            </Grid>
                            <Grid item>
                                <Button className={useStyles().reportBtn} onClick={openModal}>Report</Button>
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
                        {/* <Grid item xs={2}>
                <HighlightOffIcon onClick={closeModal}/>
              </Grid> */}
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
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p"
                                            className={useStyles().typographyStyle}>
                                    <p> Posts created: {postCount} </p>
                                    <Divider/>
                                    <p> Tags following: {tagsCount} </p>
                                    <Divider/>
                                    <p> Following authors: {followingUserCount} </p>
                                    <Divider/>
                                    <p> Followed by: {followedByCount} </p>
                                    <Divider/>
                                </Typography>
                            </CardContent>
                        </Card>
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
