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
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';


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
        borderRadius: '5px',
        width: '400px',
        // height: '300px',
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
        // marginTop: '20px',
        // borderRadius: '50px',
        // backgroundColor: 'green'
    },
}));

function Signup2(props) {
    const [open1, setOpen1] = useState(false);

    const handleOpen1 = () => {
        // props.onClick();
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const classes = useStyles();

    const [adForm, setAdForm] = useState({
        clientName: '',
        phone: '',
        email: '',
        advertType: '',
        adpackage: 0,
        startDate: '',
        endDate: '',
        redirectLink: '',
        description: ''
    })

    const handleChange = e => {
        setAdForm(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userID", adForm.clientName);
        formData.append("phone", adForm.phone);
        formData.append("email", adForm.email);

        axios({
            method: "post",
            url: 'http://localhost:9000/Signup/perDetails',
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
                setAdForm({
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


    return (
        <div>
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

                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className={classes.formTitleContainer}>
                                    <h2 className={classes.formTitle} align="center">Details</h2>
                                </div>
                            </div>

                            <h4>Personal Details</h4>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Gender"
                                        name="gender"
                                        onChange={handleChange}
                                        defaultValue={""}
                                    >
                                        <MenuItem value={"Male"} defaultValue>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{display: 'flex'}}>
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
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
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
                            </div>

                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Signup2
