import React, { useState, useEffect } from 'react'
import { Card, makeStyles, TextField, Button, Radio, RadioGroup, FormControlLabel, FormGroup, FormLabel, FormControl  } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'

// import DateFnsUtils from '@date-io/date-fns';
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#E1D4FC',
        marginBottom: '20px',
        borderRadius: '20px',
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
        // backgroundColor: '#F00FF0',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#4411A8',
                borderWidth: '3px'
            },
        },
        // borderRadius: '20px',
        // borderWidth: '3px'
    },
    inputStyles: {
        borderRadius: '30px',
        backgroundColor: '#FFFFFF',
        borderWidth: '3px',
        borderColor: '#0000FF',
        height: '40px'
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
    radioBtnStyles: {
        marginBottom: '20px',
    },
    dateStyles: {
        'day': {
            fontSize: '26px'
        }
    }
}))

function UpdateProfileForm({ userID, userName, userBio, userFaculty, userPersonalMail, userAcaMail, userGender, userBday }) {
    const [name, setName] = useState(userName);
    useEffect(() => { setName(userName)}, [userName] );

    const [bio, setbio] = useState(userBio);
    useEffect(() => { setbio(userBio)}, [userBio] );

    // const [uni, setUni] = useState(userUni);
    // useEffect(() => { setUni(userUni)}, [userUni] );

    const [faculty, setfaculty] = useState(userFaculty);
    useEffect(() => { setfaculty(userFaculty) }, [userFaculty]);

    const [acaEmail, setacaEmail] = useState(userAcaMail);
    useEffect(() => { setacaEmail(userAcaMail) }, [userAcaMail]);

    const [personalEmail, setpersonalEmail] = useState(userPersonalMail);
    useEffect(() => { setpersonalEmail(userPersonalMail) }, [userPersonalMail]);

    const [gender, setgender] = useState(userGender);
    useEffect(() => { setgender(userGender) }, [userGender]);

    const [bday, setbday] = useState(userBday);
    useEffect(() => { setbday(userBday) }, [userBday]);

    const updateProfileHandler = () => {
        let item = { 
            "userID": userID,
            "name": name,  
            "bio": bio,  
            // "unieversity": unieversity,
            "faculty": faculty, 
            "academicEmail": acaEmail, 
            "personalEmail": personalEmail,
            "gender": gender,
            "bday": bday,
        }
        console.log(item);
        const urlUpdateUser = "http://localhost:9000/api/update_profile/userProfileUpdate";
        axios.post(urlUpdateUser, item ).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Your profile got updated successfully',
                timer: 1500
            })
            console.log('User profile is updated');
        }).catch(function () {
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Something went wrong. Try again later.'
            })
          console.error("User profile update failed");
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
            <Card className={useStyles().root} >
                <form className={useStyles().formStyles} >
                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Name*</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="text" required="true" value={name} onChange={(e)=>{setName(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Bio</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="text" multiline value={bio} onChange={(e)=>{setbio(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    {/* <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >University*</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="text" multiline value={uni} onChange={(e)=>{setUni(e.target.value)}} />
                        </FormGroup>
                    </FormControl> */}

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Faculty*</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="text" multiline value={faculty} onChange={(e)=>{setfaculty(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Academic Email*</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="text" value={acaEmail} onChange={(e)=>{setacaEmail(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Personal Email*</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="email" value={personalEmail} onChange={(e)=>{setpersonalEmail(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Gender</FormLabel>
                        <RadioGroup className={useStyles().radioBtnStyles} aria-label="gender" name="gender1" defaultValue={gender} onChange={(e)=>{setgender(e.target.value)}} >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend" className={useStyles().labelStyles} >Birthday</FormLabel>
                        <FormGroup className={useStyles().textFieldStyles}  >
                            <TextField type="date" value={bday} onChange={(e)=>{setbday(e.target.value)}} />
                        </FormGroup>
                    </FormControl>

                    <Button className={useStyles().saveBtnStyles} onClick={updateProfileHandler} >Save Updates</Button>
                    <Button className={useStyles().cancelBtnStyles} onClick={cancelUpdateHandler} >Cancel</Button>

                </form>
            </Card>
        </div>
    )
}

export default UpdateProfileForm
