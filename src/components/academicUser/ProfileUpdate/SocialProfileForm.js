import React, {useEffect, useState} from 'react'
import {Button, Card, FormControl, FormGroup, FormLabel, makeStyles, TextField} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
import APIURL from '../../API/APIURL'
import {user} from "../../auth/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#E1D4FC',
        marginBottom: '20px',
        borderRadius: '5px',
    },
    formStyles: {
        margin: '10px',
        fontFamily: 'Courgette',
        padding: 30
    },
    labelStyles: {
        color: '#4411A8',
        fontSize: '18px',
    },
    textFieldStyles: {
        width: '550px',
        marginBottom: '30px',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#4411A8',
                borderWidth: '3px'
            },
        },
    },
    saveBtnStyles: {
        backgroundColor: '#935FF9',
        width: '40%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginLeft: '6%',
        marginRight: '8%',
        marginBottom: '10px'
    },
    cancelBtnStyles: {
        backgroundColor: '#9e9e9e',
        width: '40%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#d81b60',
        },
        marginBottom: '10px'
    },
}))

function SocialProfileForm() {

    const [socialAcc, setsocialAcc] = useState([])
    // const logggedInUserId = userID;
    let logggedInUserId = "";
    logggedInUserId = user()._id;

    useEffect(() => {
        axios.post(APIURL("loggedIn_User/get_socialAccounts"), {"_id": logggedInUserId}).then(function (response) {
            setsocialAcc(response.data);
        }).catch(function () {
            console.error("Socila Acconts loading failed");
        })
    }, []);

    // if (socialAcc) {
    //     console.log("Socail account is available");
    // } else {
    //     console.log("Socail account is NOT   available");
    // }

    const [linkedinLink, setlinkedinLink] = useState(socialAcc.linkedin);
    useEffect(() => {
        setlinkedinLink(socialAcc.linkedin)
    }, [socialAcc.linkedin]);

    const [fbLink, setfbLink] = useState(socialAcc.facebook);
    useEffect(() => {
        setfbLink(socialAcc.facebook)
    }, [socialAcc.facebook]);

    const [twitterLink, settwitterLink] = useState(socialAcc.twitter);
    useEffect(() => {
        settwitterLink(socialAcc.twitter)
    }, [socialAcc.twitter]);

    const [gitLink, setgitLink] = useState(socialAcc.github);
    useEffect(() => {
        setgitLink(socialAcc.github)
    }, [socialAcc.github]);

    const [personalLink, setpersonalLink] = useState(socialAcc.personal);
    useEffect(() => {
        setpersonalLink(socialAcc.personal)
    }, [socialAcc.personal]);

    const saveAccountsHandler = () => {
        let socialLinks = {
            "userID": logggedInUserId,
            "linkedin": linkedinLink,
            "facebook": fbLink,
            "twitter": twitterLink,
            "github": gitLink,
            "personal": personalLink
        }
        const urlSocialAccUpdate = APIURL("update_profile/socialAccountsUpdate");
        axios.post(urlSocialAccUpdate, socialLinks).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Your social profiles got updated successfully',
                timer: 1500
            })
            console.log('Social profiles are updated');
        }).catch(function () {
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Something went wrong. Try again later.'
            })
            console.error("Social profiles update failed");
        })
    }

    const cancelUpdateHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your updates will be discarded!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d81b60',
            cancelButtonColor: '#935FF9',
            confirmButtonText: 'Yes, discard!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Discarded!',
                    'Your updates did not get recorded.',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <Card className={useStyles().root}>
                <form className={useStyles().formStyles}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={useStyles().labelStyles}>LinkedIn Account</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}>
                            <TextField type="text" value={linkedinLink} onChange={(e) => {
                                setlinkedinLink(e.target.value)
                            }}/>
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={useStyles().labelStyles}>Github Account</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}>
                            <TextField type="text" value={gitLink} onChange={(e) => {
                                setgitLink(e.target.value)
                            }}/>
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={useStyles().labelStyles}>Facebook Account</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}>
                            <TextField type="text" value={fbLink} onChange={(e) => {
                                setfbLink(e.target.value)
                            }}/>
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={useStyles().labelStyles}>Twitter Account</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}>
                            <TextField type="text" value={twitterLink} onChange={(e) => {
                                settwitterLink(e.target.value)
                            }}/>
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={useStyles().labelStyles}>Personal Website
                            Link</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}>
                            <TextField type="text" value={personalLink} onChange={(e) => {
                                setpersonalLink(e.target.value)
                            }}/>
                        </FormGroup>
                    </FormControl>

                    <Button className={useStyles().saveBtnStyles} onClick={saveAccountsHandler}>Save Accounts</Button>
                    <Button className={useStyles().cancelBtnStyles} onClick={cancelUpdateHandler}>Cancel</Button>
                </form>
            </Card>
        </div>
    )
}

export default SocialProfileForm
