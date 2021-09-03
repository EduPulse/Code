import React from 'react'
import { Button,makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    tags:{
        margin: theme.spacing(1),
        backgroundColor:'white',
        borderRadius:'50px'
    }
}))


function Tags() {
    const classes = useStyles()
    return (
        <div >
           <Button variant="contained" className={classes.tags}>#Science</Button>
           <Button variant="contained" className={classes.tags}>#History</Button>
           <Button variant="contained" className={classes.tags}>#Machine Learning</Button>
           <Button variant="contained" className={classes.tags}>#Biology</Button>
           <Button variant="contained" className={classes.tags}>#Programming</Button>
           <Button variant="contained" className={classes.tags}>#Engineering</Button>
           <Button variant="contained" className={classes.tags}>#Law</Button>
        </div>
    )
}

export default Tags
