import React, {useEffect, useState} from 'react'
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
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios';
import swal from 'sweetalert';
import Signup2 from './SignupModal2';


const useStyles = makeStyles((theme) => ({
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

function Signup1({ userID }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
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
        if(e.target.name=='userType' && e.target.value=='Yes'){
            setChecked(true);
        }else{
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
    var institutesDrop=[];
    // institutesDrop.push([true, institutesDrop[postIndex++]];

    const handleSubmit = (e) => {
        e.preventDefault();
        var type = '';
        if(signupForm.userType=='Yes'){
            type='academic';
        }else{
            type='general';
        }

        const userID = '60ecfe51395a1704a42d8cae';
        let item = { 
            "userID": userID,
            "userType": type,  
            "uniName": signupForm.uniName,
            "facName": signupForm.facName,
            "acaEmail": signupForm.acaEmail,
            "acaRole": signupForm.acaRole
        }
        console.log(item);
        const urlUpdateUser = "http://localhost:9000/api/Signup/role";
        axios.post(urlUpdateUser, item ).then(function (response) {
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


    return (
        <div>
            <Button variant="contained" color="primary" className={classes.newad} onClick={handleOpen}>Test</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                // disableBackdropClick
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>

                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                            {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className={classes.formTitleContainer}>
                                    <h2 className={classes.formTitle} align="center">Details</h2>
                                </div>
                            </div> */}

                            {/* <h2 className={classes.formTitle} align="center">Publish New Ad</h2> */}
                            
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <h4>Are you related to Academics ?</h4>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
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
                                            {/* <MenuItem value={"undergraduate"} defaultValue>Undergraduate</MenuItem> */}
                                            {institutes.map(institute =>
                                                <MenuItem value={institute._id}>{institute.name}</MenuItem>
                                                )}
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* <div>
                                    <TextField
                                        id="outlined-full-width"
                                        label="Faculty Name"
                                        placeholder="Placeholder"
                                        fullWidth variant="outlined"
                                        className={classes.textfield}
                                        value={signupForm.facName}
                                        name="facName"
                                        onChange={handleChange}
                                    />
                                </div> */}
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
                                            style={{width: '250px'}}
                                        >
                                            <MenuItem value={"undergraduate"} defaultValue>Undergraduate</MenuItem>
                                            <MenuItem value={"staff"}>staff</MenuItem>
                                            <MenuItem value={"lecturer"}>lecturer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Collapse>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Signup2
                                    onClick={handleClose}
                                />
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Signup1
