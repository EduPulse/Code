import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        width: 285,
        height: 300,
        margin: 10,
        borderRadius: 5,
        paddingTop: 5,
        display: "grid"
    },
    profilePic: {
        width: 80,
        height: 80,
        margin: "auto",

    },
    bio: {
        textAlign: "center",
        fontSize: 16,
        overflow: "hidden",
    },
    name: {
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default function UserCard({userID}) {
    const classes = useStyles();

    const [stateUserInfo, setStateUserInfo] = useState([]);
    // get user info
    const urlGetFollowers = "http://localhost:9000/get_user_data/";
    useEffect(() => {
        axios.post(urlGetFollowers, {_id: userID}).then(function (response) {
            if (response.data)
                setStateUserInfo(response.data[0]);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    return (
        <div>
            <Card className={classes.root}>
                <Avatar alt="Profile image" className={classes.profilePic} src={stateUserInfo.profilePicture}/>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                            <Link href={"/components/generalUser/userProfile"}
                                  style={{textDecoration: "none", wordWrap: "break-word"}}>{stateUserInfo.name}</Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.bio}>
                            {stateUserInfo.bio}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    );
}
