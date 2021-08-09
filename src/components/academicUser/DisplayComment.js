import React, {useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ReportIcon from '@material-ui/icons/Report';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        width:"100%",
        borderRadius:15,
        height:"fit-content",
        paddingBottom:-10,
        marginBottom:0,
        marginTop:10,
    },
    actions:{
        paddingTop:12,
        marginBottom:0,
        paddingBottom:0,
    }
});

export default function DisplayComment({writerID,timestamp,content,likes,dislikes,comments,reports}) {
    const classes = useStyles();

    const [stateUserData,setStateUserData]=useState([]);

    const urlGetUserInfo="http://localhost:9000/get_user_data/";
    const userID={"_id":writerID};

    useEffect(()=>{
        axios.post(urlGetUserInfo,userID).then(function (response) {
            console.log(response.data)
            setStateUserData(response.data[0]);
        })
            .catch(function () {
                console.error("load failed");
            })
    },[]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent style={{paddingBottom:0}}>
                <CardHeader style={{paddingTop:0,}}
                    avatar={
                        <Avatar alt="Remy Sharp" src={stateUserData.profilePicture} />
                    }
                    title={stateUserData.name}
                    subheader={timestamp}
                />
                    <div>
                        <span id="outlined-basic" label="Comment" style={{width:"100%",paddingLeft:12,fontSize:18,}}>
                            {content}
                        </span>
                    </div>
                <Grid container spacing={3} className={classes.actions}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={5}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Button>
                                <span><ThumbUpIcon/><br/>{likes}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button>
                                    <span><ThumbDownIcon/><br/>{dislikes}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button>
                                <span><AddCommentIcon/><br/>{comments}</span>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button>
                                    <span><ReportIcon/><br/>{reports}</span>
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}