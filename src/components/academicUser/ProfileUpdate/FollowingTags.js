import React, {useEffect, useState} from 'react'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import axios from 'axios';
import {Button, Checkbox, Divider, makeStyles} from '@material-ui/core';
import Swal from 'sweetalert2'
import APIURL from '../../API/APIURL'

const useStyles = makeStyles((theme) => ({
    saveBtnStyles: {
        backgroundColor: '#935FF9',
        width: '200px',
        marginTop: '30px',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginLeft: '10px',
        marginRight: '8%',
        marginBottom: '20px'
    },
    cancelBtnStyles: {
        backgroundColor: '#9e9e9e',
        width: '200px',
        marginTop: '30px',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#d81b60',
        },
        marginBottom: '20px'
    },
    root: {
        marginLeft: '55px'
    }
}))

function FollowingTags() {

    const [tags, settags] = useState([]);
    const url_getAllTags = APIURL("http://localhost:9000/loggedIn_User/get_allTags");
    useEffect(() => {
        axios.post(url_getAllTags).then(function (response) {
            if (response.data)
            settags(response.data);
        }).catch(function () {
        console.error("Tags got loaded failed!");
        })
    }, []);

    const userID = '60ecfe51395a1704a42d8cae';
    const [myTags, setmyTags] = useState([]);
    const url_getMyTags = APIURL("http://localhost:9000/loggedIn_User/get_all_tags");
    useEffect(() => {
        axios.post(url_getMyTags, {user_id: userID}).then(function (response) {
            if (response.data)
            setmyTags(response.data);
        }).catch(function () {
        console.error("My Tags loaded failed!");
        })
    }, []);
    let myTagsCount = 0
    let myTagIDs = [];
    myTags.map(tag => {
        myTagsCount = myTagsCount + 1;
        myTagIDs.push(tag.tagId)
    });

    const [allFollowingTags, setallFollowingTags] = useState(myTagIDs);

    function handleMyTags(id) {
        if (myTagIDs.includes(id)) {
            for (let i = 0; i < myTagIDs.length; i++) {
                if (myTagIDs[i] == id) {
                    myTagIDs.splice(i, 1); 
                }
            }
        } else {
            myTagIDs.push(id)
        }
    }

    const ifollow = tags.map(tag => {
        if (myTagIDs.includes(tag._id)) {
            return (
                <div>
                    <Checkbox 
                        id={tag._id} 
                        icon={<CancelPresentationIcon />} 
                        checkedIcon={<CancelPresentationTwoToneIcon />}
                        onClick={() => handleMyTags(tag._id)}
                    />
                    { tag.verbose }
                </div>
            )
        }
    })

    function handleAllTags(id) {
        if (!(myTagIDs.includes(id))) {
            myTagIDs.push(id)
        } 
        else {
            for (let i = 0; i < myTagIDs.length; i++) {
                if (myTagIDs[i] == id) {
                    myTagIDs.splice(i, 1); 
                }
            }
        }
    }
    
    const iDontFollow = tags.map(tag => {
        if (!(myTagIDs.includes(tag._id))) {
            return (
                <div>
                    <Checkbox 
                        id={tag._id}
                        onClick={() => handleAllTags(tag._id)}
                    /> 
                    { tag.verbose }
                </div>
            )
        }
    })

    const saveUpdates = () => {
        setallFollowingTags(myTagIDs);

        let item = {
            "userID": userID,
            "followingTags": myTagIDs
        }
        const url_updateFollowingTags = APIURL("http://localhost:9000/update_profile/updateFollowingTags");
        axios.post(url_updateFollowingTags, item ).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Your updates got saved successfully',
                timer: 1500
            })
            console.log('Following tags got updated');
        }).catch(function () {
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Something went wrong. Try again later.'
            })
          console.error("Following tags update failed");
        })
    }

    const cancelUpdates = () => {
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
        <div className={useStyles().root} >
            <div>
                <h3>Following: </h3>
                { ifollow }
            </div>
            <Divider />
            <div>
            <h3>Do not Following: </h3>
                { iDontFollow }
            </div>
            <Divider />
            <div>
                <Button className={useStyles().saveBtnStyles} onClick={saveUpdates} >Save changes</Button>
                <Button className={useStyles().cancelBtnStyles} onClick={cancelUpdates} >Cancel changes</Button>
            </div>
        </div>
    )
}

export default FollowingTags