import React, {useState} from 'react'
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import APIURL from '../../API/APIURL'
import Autocomplete from '@material-ui/lab/Autocomplete';
//import {useHistory} from 'react-router'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '15px',
        width: '500px',
        margin: '20px 0'
    },
    formTitleContainer: {
        backgroundColor: '#4411A8',
        width: '80%',
        marginTop: '10px',
        borderRadius: '15px',
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

    Newbutton: {
        marginTop: '20px',
        borderRadius: '50px'
    },
    submitbutton: {
        width: '30%',
        padding: '10px 10px',
        borderRadius: '10px',
        marginTop: '10px',
    },
    selectbox: {
        margin: theme.spacing(1, 2, 1, 0)
    }
}));

const AddModerator = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [value, setValue] = useState(null);
    const [Faculty, setFaculty] = useState(null);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
//    const history = useHistory()

    const url = APIURL('Moderators/new');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(url, {email: email, univeristy: value, faculty: Faculty})
            .then(function (response) {
                swal("Moderator added successfully", "", "success")
                    .then(handleClose())
                setEmail("");

            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    }

    const handleChange = e => {
        setEmail(e.target.value)
    }

    const university = [
        'University of Colombo',
        'University of Peradeniya',
        'University of Sri Jayewardenpura',
        'University of Kelaniya',
        'University of Moratuwa',
        'University of Jaffna',
        'University of Ruhuna',
        'Eastern University Sri Lanka',
        'Rajarata University of Sri Lanka',
        'Wayamba University of Sri Lanka',
        'Sabaragamuwa University of Sri Lanka',
        'South Eastern University of Sri Lanka',
        'The Open University of Sri Lanka',
        'University of Buddhism & Pali of Sri Lanka',
    ]

    const faculty = [
        'Faculty of Arts',
        'Faculty of Education',
        'Faculty of Graduate Studies',
        'Faculty of Law',
        'Faculty of Management and Finance',
        'Faculty of Medicine',
        'Faculty of Science',
        'Faculty of Computing',
        'Faculty of Nursing',
        'School of Computing',
        'Sri Palee Campus'
    ]

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.Newbutton} onClick={handleOpen}>Add New
                Moderator +</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className={classes.formTitleContainer}>
                                    <h2 className={classes.formTitle} align="center">Add New Moderator </h2>
                                </div>
                            </div>

                            <TextField
                                id="outlined-full-width"
                                label="Enter email"
                                fullWidth
                                variant="outlined"
                                className={classes.textfield}

                                name="email"
                                onChange={handleChange}
                            />

                            <Autocomplete
                                id="combo-box-demo"
                                options={university}
                                getOptionLabel={(option) => option}
                                style={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Select the Univeristy"
                                                                    variant="outlined"/>}
                                className={classes.selectbox}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />

                            <Autocomplete
                                id="combo-box-demo"
                                options={faculty}
                                getOptionLabel={(option) => option}
                                style={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Select the faculty"
                                                                    variant="outlined"/>}
                                className={classes.selectbox}
                                onChange={(event, newValue) => {
                                    setFaculty(newValue);
                                }}
                            />

                            <center>
                                <Button variant="contained" color="primary" className={classes.submitbutton}
                                        type="submit"> Submit </Button>
                            </center>

                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddModerator;
