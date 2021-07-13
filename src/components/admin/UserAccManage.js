import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    title:{
        color: '#4411A8',
    },
    titlecontainer:{
      backgroundColor:'white',
      width:'40vw',
      marginTop: '80px',
      borderRadius:'20px',
      padding:'5px 5px'
    }
}));

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
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
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} alignContent="center">
                 No of Reports - 4 
                <Button variant="contained" color="primary">Review</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.string.isRequired,
      carbs: PropTypes.string.isRequired,
      fat: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.string.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      protein: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  const rows = [
    createData('01265684', 159, 6.0, 24, '17255632'),
    createData('04255687', 237, 9.0, 37, '04285670'),
    createData('13295684', 262, 16.0, 24, '03335684'),
    createData('04285670', 305, 3.7, 67, '01265684'),
    createData('17255632', 356, 16.0, 49,'13295684'),
  ];
  

function UserAccManage() {
    return (
        <div>
            <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>Reported User Accounts Managment</h2>
                </div>
            
            <TableContainer component={Paper} style={{margin:'20px 20px',width:'70vw',borderRadius:'15px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell><h3>User ID</h3></TableCell>
                        <TableCell align="right"><h3>Account Type</h3></TableCell>
                        <TableCell align="right"><h3>Issue Type</h3></TableCell>
                        <TableCell align="right"><h3>Reported User's ID</h3></TableCell>
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
