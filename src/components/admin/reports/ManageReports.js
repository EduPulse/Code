import React,{useState} from 'react'
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import { withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: '#DFDAE8',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '15px',
        width: '80%',
        height: '80%',
        margin: '40px 0',
        overflowY: 'scroll',
    },
    formTitleContainer: {
        backgroundColor: '#4411A8',
        width: '50%',
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
    }
}));

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(msg, reportedBy, title, id) {
    return {
       msg, reportedBy, title ,id
    };
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>

            <TableRow className={classes.root}>

                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{row.reportedBy}</TableCell>
                <TableCell >{row.title}</TableCell>

            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} alignContent="center">
                            Report Description - 
                            {row.msg}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}

const ManageReports = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [Reports, setReports] = useState([])

    const handleOpen = () => {
        const url = 'http://localhost:9000/accreports/get'
        axios.post(url,{data:props.id})
        .then(function(resp){
            console.log(resp.data)
            setReports(resp.data.reports)
            setOpen(true);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const rows = Reports.map(x => createData(x.message, x.reportedBy.name, x.title ,x._id));

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: '#4411A8',
            color: theme.palette.common.white,
            fontSize:'18px',
            fontWeight:'600'
        }
    }))(TableCell);

    const reportsManageUrl = 'http://localhost:9000/accreports/manageReports';
    const Reinstate = (id)=>{
        swal({
            title: "Confirm?",
            text: "User Account will be reinstated",
            icon: "warning",
            buttons: true,
            
        })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(reportsManageUrl,{data:id,type:'reInstate'})
                .then(function(resp){
                    console.log(resp.data)
                    swal("User Account is reinstated successfully", {
                        icon: "success",
                    });
                })               
            }
          });
        
    }

    const Deactivate =(id)=>{
        swal({
            title: "Confirm?",
            text: "User account will be deactiavted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(reportsManageUrl,{data:id,type:'deactive'})
                .then(function(resp){
                    console.log(resp.data)
                    swal("User Account is reinstated successfully", {
                        icon: "success",
                    });
                })
            }
          });
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>Review</Button>

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
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div className={classes.formTitleContainer}>
                                <h3 className={classes.formTitle} align="center">Active Reports Details </h3>
                            </div>
                        </div>

                        <center>
                        <TableContainer component={Paper} style={{margin: '20px 20px', width: '70vw', borderRadius: '15px'}}>
                            <Table aria-label="collapsible table">
                                <TableHead style={{color: 'white'}}>
                                    <TableRow>
                                        <StyledTableCell/>
                                        <StyledTableCell>Reported By</StyledTableCell>
                                        <StyledTableCell>Report title</StyledTableCell>
                                        {/* <StyledTableCell align="right">Issue Type</StyledTableCell>
                                        <StyledTableCell align="right">Reported User's ID</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <Row key={row.id} row={row}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="primary" style={{margin:'0 10px'}} onClick={()=>{Reinstate(props.id)}}>Reinstate User Account</Button>
                        <Button variant="contained" color="secondary" style={{margin:'0 10px'}} onClick={()=>{Deactivate(props.id)}}>Deactivate User Account</Button>
                        </center>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ManageReports;
