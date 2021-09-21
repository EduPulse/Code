import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    root: {
        width: 340,
        margin: 10,
    },
    media: {
        height: 140,
        borderRadius: 5,
    },
});

export default function UniversityListing({name, location, description, coverImage}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={coverImage === "" ? (coverImage) : ("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                        <Link href={'/components/academicUser/viewUniversityProfile'}
                              style={{fontWeight: 600, textDecoration: "none"}}>{name}</Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p" style={{textAlign: 'justify'}}>
                        {
                            location !== "" ? (
                                <span style={{fontWeight: 600}}><LocationOnIcon/> &nbsp; {location}</span>) : (<span/>)
                        }
                        <br/>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
