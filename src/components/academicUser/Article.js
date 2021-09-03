import React from 'react'
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 250,
    },
    title:{
        textAlign:"left",
        fontWeight:"bold",
    },
    tags:{
        margin: theme.spacing(1),
        fontWeight:"bold",
        borderRadius:'50px'
    },
    content:{
        fontSize:20,
        padding:20,
        paddingTop:10,
        textAlign:'justify',
    },
    contentFooter:{
        textAlign:"center",
        display:"block",
        padding:10,
    }
}));

export default function Article({customWidth}) {
    const classes = useStyles();
    return (
        <div>
            <div align="center" style={{width:customWidth}}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"
                            title="Cover Image"
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h2" className={classes.title}>
                                Say hallo to Raspberry PI 🍓
                            </Typography>
                            <br/>
                            <div>
                                <Button color="primary" className={classes.tags}>#Science</Button>
                                <Button color="secondary" className={classes.tags}>#Electronics</Button>
                                <Button color="default" className={classes.tags}>#Raspberry</Button>
                                <Button color="green" className={classes.tags}>#ComputerScience</Button>
                            </div>
                        </CardContent>

                    </CardActionArea>
                    <hr/>
                    <CardActions>
                        <div className={classes.content}>
                            {/*article*/}
                        </div>
                    </CardActions>
                    <hr/>
                    <div className={classes.contentFooter}>
                        <span>Repost abuse</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}