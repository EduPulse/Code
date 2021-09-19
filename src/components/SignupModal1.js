import React, {useState} from 'react'
import Modal from '@material-ui/core/Modal';
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
    modal: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '300px',
        // height: 'auto',
        margin: '20px 0'
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
    newad: {
        marginTop: '20px',
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
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setChecked(false);
    };

    const classes = useStyles();

    const [signupForm, setSignupForm] = useState({
        userID: '',
        userType: '',
        uniName: '',
        facName: '',
        acaEmail: '',
        acaRole: ''
    })

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userID", userID);
        formData.append("userType", signupForm.userType);
        formData.append("uniName", signupForm.uniName);
        formData.append("facName", signupForm.facName);
        formData.append("acaEmail", signupForm.acaEmail);
        formData.append("acaRole", signupForm.acaRole);

        axios({
            method: "post",
            url: 'http://localhost:9000/api/Signup/role',
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }

        })
            .then(function (response) {
                swal("Ad saved successfully", "", "success");
                console.log(response)
                setSignupForm({
                    userType: '',
                    uniName: '',
                    facName: '',
                    acaEmail: '',
                    acaRole: ''
                })
                // setfiles(null)
            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }


    return (
        <div>
            <Button variant="contained" color="primary" className={classes.newad} onClick={handleOpen}>Publish New Ad
                +</Button>
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
                    <div className={classes.paper}>

                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className={classes.formTitleContainer}>
                                    <h2 className={classes.formTitle} align="center">Details</h2>
                                </div>
                            </div>

                            {/* <h2 className={classes.formTitle} align="center">Publish New Ad</h2> */}
                            
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <h3>Are you related to Academics ?</h3>
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
                                    <TextField
                                        id="outlined-full-width"
                                        label="University Name"
                                        placeholder="Placeholder"
                                        fullWidth variant="outlined"
                                        className={classes.textfield}
                                        value={signupForm.uniName}
                                        name="uniName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
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
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Academic Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Select Academic Role"
                                            name="acaRole"
                                            onChange={handleChange}
                                            defaultValue={""}
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
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Signup1
