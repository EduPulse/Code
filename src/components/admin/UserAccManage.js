import React, {useEffect, useState} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import APIURL from '../API/APIURL';
import axios from 'axios';
import Review from './reports/ManageReports';

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#4411A8',
    },
    titlecontainer: {
        backgroundColor: 'white',
        width: '40vw',
        marginTop: '80px',
        borderRadius: '20px',
        padding: '5px 5px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
    },
    table: {
        minWidth: 700,
    }

}))

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(Id,name,role,university) {
    return {Id,name,role,university};
}

/*   const rows = [
    createData('SLITT', 'No.2', 'Video', '2021/07/02', '2021/07/21'),
  ]; */

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#4411A8',
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight:'600'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


function UserAccManage() {
    const classes = useStyles();
    //const [Ads, setAds] = useState([])
    const [reports, setReports] = useState([]);
    const url = APIURL("accreports");

    useEffect(() => {
            axios.get(url)
            .then(function (res) {
                console.log(res.data)
                setReports(res.data)
                
            })
    }, [url])
    const rows = reports.map(x => createData(x._id._id,x._id.name, x._id.role,x._id.university));

    return (
        <div>
            <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>User Account Reports Managment</h2>
                </div>
            </center>


            <div align="center">
                <TableContainer component={Paper} style={{margin: '20px 100px', width: '80%', borderRadius: '15px'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">User Name</StyledTableCell>
                                <StyledTableCell align="center">Account Type</StyledTableCell>
                                <StyledTableCell align="center">University</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((arr) => (
                                <StyledTableRow key={arr.Id}>
                                    <StyledTableCell component="th" scope="row">{arr.name}</StyledTableCell>
                                    <StyledTableCell align="center">{arr.role}</StyledTableCell>
                                    <StyledTableCell align="center">{arr.university}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Review id={arr.Id}/>
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

export default UserAccManage;
