import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Newad from './newad';


const useStyles= makeStyles((theme)=>({
    title:{
        color: '#4411A8',
    },
    titlecontainer:{
      backgroundColor:'white',
      width:'40vw',
      marginTop: '80px',
      borderRadius:'20px',
      padding:'5px 5px',
      boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
    },
    table: {
        minWidth: 700,
    },
    newad:{
        marginTop:'20px',
        borderRadius:'50px'
    },
    
}))

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(Client, Package,Type,StartingDate, EndDate) {
    return { Client, Package,Type,StartingDate, EndDate };
  }
  
  const rows = [
    createData('SLITT', 'No.2', 'Video', '2021/07/02', '2021/07/21'),
    createData('IIT', 'No.2', 'Video', '2021/06/30', '2021/07/14'),
    createData('APIIT', 'No.1', 'Image', '2021/06/20', '2021/07/19'),
    createData('NSBM', 'No.3', 'Text', '2021/07/02', '2021/07/10'),
    createData('AAT', 'No.2', 'Video', '2021/07/02', '2021/07/10'),
  ];

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#4411A8',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

function AdvManage() {
    const classes = useStyles();
    
    return (
        <div>
            <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>Advertisments Management</h2>
                </div>
            </center>
            
            
            <div align="center">
                <Newad/>
                <TableContainer component={Paper} style={{margin:'20px 100px',width:'80%',borderRadius:'15px'}}>
                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                      <TableRow>
                          <StyledTableCell>Client</StyledTableCell>
                          <StyledTableCell align="right">Package</StyledTableCell>
                          <StyledTableCell align="right">Type</StyledTableCell>
                          <StyledTableCell align="right">StartingDate</StyledTableCell>
                          <StyledTableCell align="right">EndDate</StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Client}>
                        <StyledTableCell component="th" scope="row">
                            {row.Client}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.Package}</StyledTableCell>
                        <StyledTableCell align="right">{row.Type}</StyledTableCell>
                        <StyledTableCell align="right">{row.StartingDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.EndDate}</StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" color="primary" style={{marginLeft:"50px"}}>Preview</Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

            
        </div>
    )
}

export default AdvManage
