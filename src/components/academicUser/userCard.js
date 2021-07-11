import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        margin:10,
        borderRadius:5,
        padding:8,
        display:"grid"
    },
    profilePic:{
        width:80,
        height:80,
        margin:"auto",

    },
    bio:{
        textAlign:"center",
        fontSize:16,
    },
    name:{
        textAlign:"center",
        fontWeight:"bold",
    },
});

export default function UserCard({name,bio,ppLink}) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <Avatar alt="Profile image" className={classes.profilePic} src={ppLink} />
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                            <Link to={'/users'}>{name}</Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.bio}>
                            {bio}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    );
}
