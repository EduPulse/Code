import React from 'react'
import JoinImg from '../assets/bg.jpg'
import { Button,makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    card: {
        backgroundImage:`url(${JoinImg})`,
        color:'#4411A8',
        padding:'20px 20px',
        height:'200px',
        borderRadius:'15px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    joinButton: {
        borderRadius:'50px',
        padding: theme.spacing(1,6),
        margin: theme.spacing(1,0),
        fontWeight: '700'
    },
    text1:{
        fontWeight:'400',
        color:'black',
        margin: theme.spacing(0,0,0,0),  
    },
    text2:{
        margin: theme.spacing(0,0,2,0),  
    },
    text3:{
        fontWeight:'400',
        color:'black',
        margin: theme.spacing(6,0,0,0),  
    },
}))

function Joincard() {
    const classes = useStyles()

    return (
        <div className={classes.card}>
            <h2 className={classes.text1}>Welcome to</h2>
            <h1 className={classes.text2}>EduPulse</h1>
            <h4 className={classes.text3}>Still haven't joined with us?</h4>
            <Button variant="outlined" color="secondary" className={classes.joinButton}> Join </Button>
        </div>
    )
}

export default Joincard
