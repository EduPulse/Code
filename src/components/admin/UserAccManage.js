import React from 'react'
//import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { makeStyles,alpha,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    title:{
        color: '#4411A8',
    },
    titlecontainer:{
      backgroundColor:'white',
      width:'40vw',
      marginTop: '80px',
      borderRadius:'20px',
      padding:'5px 5px'
    },
    search: {
        position: 'relative',
        borderRadius: '10px',
    
        backgroundColor: alpha(theme.palette.common.white, 0.5),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(3),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          marginTop :'10px',
          width: '20%',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}));

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function createData(user, accountType, issueType, reportedUser) {
    return {
      user,
      accountType,
      issueType,
      reportedUser
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
          
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell component="th" scope="row">{row.user}</TableCell>
          <TableCell align="right">{row.accountType}</TableCell>
          <TableCell align="right">{row.issueType}</TableCell>
          <TableCell align="right">{row.reportedUser}</TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} alignContent="center">
                 No of Reports - 4 
                <Button variant="contained" color="primary" style={{marginLeft:"100px"}}>Review</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
function UserAccManage() {
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const url = "http://localhost:9000/accreports"

  useEffect(() => {
    axios.get(url)
    .then(function(res){
      console.log(res.data)
      setReports(res.data)
    })
  }, [url])


  const rows = reports.map(x=>createData(x.against.user.name,x.against.user.role,x.title,x.reportedBy.name));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#4411A8',
      color: theme.palette.common.white,
    }
  }))(TableCell);


    return (
        <div>
            <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>Reported User Accounts Managment</h2>
                </div>
                <div className={useStyles().search}>
                    <div className={useStyles().searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: useStyles().inputRoot,
                        input: useStyles().inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

                <div>
                <FormControl className={useStyles().formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Search By</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={age}
                      onChange={handleChange}
                    >

                    <MenuItem value={10}>User ID</MenuItem>
                    <MenuItem value={20}>Account Type</MenuItem>
                    <MenuItem value={30}>Issue Type</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper} style={{margin:'20px 20px',width:'70vw',borderRadius:'15px'}}>
                <Table aria-label="collapsible table">
                    <TableHead style={{color:'white'}}>
                    <TableRow>
                        <StyledTableCell />
                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell align="right">Account Type</StyledTableCell>
                        <StyledTableCell align="right">Issue Type</StyledTableCell>
                        <StyledTableCell align="right">Reported User's ID</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </center>
        </div>
    );
}

export default UserAccManage
