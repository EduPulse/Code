import React ,{useEffect,useState} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Newad from './ads/newad';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { LinkPreviewer } from "./ads/LinkPreviewer";
import { Deletead } from "./ads/Deletead";
import { NewADforClient } from "./ads/NewADforClient";
import { UpdateAd } from "./ads/UpdateAd";

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
    }
    
}))

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(Client, Package,Type,StartingDate, EndDate , Link, AdID) {
    return { Client, Package,Type,StartingDate,EndDate,Link,AdID };
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



function AdvManage() {
    const classes = useStyles();
    const [Ads, setAds] = useState([])

    const url = 'http://localhost:9000/ad/'
    useEffect(()=>{
      axios.get(url)
      .then((res)=>{
        setAds(res.data)
        console.log(res.data)
      })
    },[url])


    const rows = Ads.map(Client=>
      Client.advertisements.map(
        Ad=>
          createData(
            Client.publicName,
            Ad.package,
            Ad.type,
            new Date(Ad.starting).toLocaleString().split(',')[0],
            new Date(Ad.validTill).toLocaleString().split(',')[0],
            Ad.Media,
            Ad._id
          )
      )  
    )

    
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
                    {rows.map((arr) => (arr.map(row=>
                        <StyledTableRow key={row.Link}>

                        <StyledTableCell component="th" scope="row">{row.Client}</StyledTableCell>
                        <StyledTableCell align="center">{row.Package}</StyledTableCell>
                        <StyledTableCell align="right">{row.Type}</StyledTableCell>
                        <StyledTableCell align="right">{row.StartingDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.EndDate}</StyledTableCell>
                        <StyledTableCell align="right">
                        <div style={{display:"inline-table"}}>

                            <LinkPreviewer image={row.Link} type={row.Type}/>
                            
                            <NewADforClient client={row.Client}/>
                            
                            <UpdateAd client={row.Client} id={row.AdID}/>
                            
                            <Deletead client={row.Client} id={row.AdID}/>
                            
                          </div>
                        </StyledTableCell>
                        </StyledTableRow>
                    )))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

            
        </div>
    )
}

export default AdvManage
