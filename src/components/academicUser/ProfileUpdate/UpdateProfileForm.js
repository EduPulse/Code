import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import {Button, Card, CardContent, makeStyles} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'block',
    },
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
    },
    avatar: {
        backgroundColor: '#935FF9',
    },
    buttonStyleMain: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
        marginBottom: '20px'
    },
    buttonStyleSub: {
        backgroundColor: '#b3b3cc',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#FA2C2C',
        },
        marginBottom: '20px'
    },
    buttonStyleSubmit: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        paddingLeft: '20px',
        textAlign: 'center',
        width: '150px',
        '&:hover': {
            backgroundColor: '#935FF9',
        },
        marginBottom: '20px',
        marginTop: '30px'
    },
    buttonStyleCancel: {
        backgroundColor: '#FA2C2C',
        color: '#FFFFFF',
        marginLeft: '20px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#A50000',
        },
        marginBottom: '20px',
        marginTop: '30px'
    },
    controlStyle: {
        backgroundColor: '#C5B6E3',
    }
}));

function UpdateProfileForm({ userID, userName, userPersonalEmail, userProfilePic, userGender, userBday, userBio, userUniversity, userStatus }) {
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
        console.warn("item", item);
        console.log(item);
        const urlUpdateUser = "http://localhost:9000/update_profile/userProfileUpdate";
        axios.post(urlUpdateUser, item ).then(function (response) {
          console.log('User profile is updated');
        }).catch(function () {
          console.error("User profile update failed");
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
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DatePicker value={bday} onChange={(e)=>{setbday(e.target.value)}} />
                            </MuiPickersUtilsProvider> */}
                        </FormGroup>
                    </FormControl>

                    <Button className={useStyles().saveBtnStyles} onClick={updateProfileHandler} >Save Updates</Button>
                    <Button className={useStyles().cancelBtnStyles} >Cancel</Button>

                </form>
            </Card>
        </div>
    )
}

export default UpdateProfileForm