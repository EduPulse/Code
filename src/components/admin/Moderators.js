import React, {useEffect, useState} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import Newad from './ads/newad';
import axios from 'axios';
import AddModerator from "./Moderators/AddModerator.js";
import RemoveModerator from "./Moderators/RemoveModerator.js";
import APIURL from '../API/APIURL';
/* import { LinkPreviewer } from "./ads/LinkPreviewer";
import { Deletead } from "./ads/Deletead";
import { NewADforClient } from "./ads/NewADforClient";
import { UpdateAd } from "./ads/UpdateAd"; */

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

function createData(Name, University, Id) {
    return {Name, University, Id};
}

/*   const rows = [
    createData('SLITT', 'No.2', 'Video', '2021/07/02', '2021/07/21'),
  ]; */

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#4411A8',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const Moderators = () => {

    const classes = useStyles();
    const [Moderators, setModerators] = useState([])

    const url = APIURL('Moderators/');
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setModerators(res.data)
                console.log(res.data)
            })
    }, [url])


    const rows = Moderators.map(Moderator =>
        createData(
            Moderator.name,
            Moderator.academicInstitute.name,
            Moderator._id
        )
    )

    return (
        <div>
            <center>
                <div className={useStyles().titlecontainer}>
                    <h2 className={useStyles().title}>Moderators Management</h2>
                </div>
            </center>

            <div align="center">
                <AddModerator/>

                <TableContainer component={Paper} style={{margin: '20px 100px', width: '60%', borderRadius: '15px'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">University and Faculty</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row =>
                                <StyledTableRow key={row.Name}>

                                    <StyledTableCell component="th" scope="row">{row.Name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.University}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div style={{display: "inline-table"}}>

                                            <RemoveModerator id={row.Id}/>

                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default Moderators;
