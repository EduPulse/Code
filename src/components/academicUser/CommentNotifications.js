import React from 'react'
import { makeStyles } from '@material-ui/core';
import Comments from './Comments'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:'190px',
      width: '80%',
      marginBottom: '30px',
      marginLeft: '130px',
      borderRadius: '10px'
    },

    pubPostInfo: {
        width: '80%',
        marginTop:'100px',
    },
    
    postsInfo:{
      width:'100%',
    //   marginTop:'100px',
    },
    avatar: {
        backgroundColor:'#935FF9',
        marginLeft: '50px'
    },
    typography: {
        color: 'black'
    }
}));

function CommentNotifications () {
    const classes = useStyles();

    return (
        <div>
            <Comments/>
            <Comments/>
            <Comments/>
        </div>
    );
}

export default CommentNotifications