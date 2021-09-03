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
                    image={coverImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                        <Link href={'/components/generalUser/viewUniversityProfile'}
                              style={{fontWeight: 600, textDecoration: "none"}}>{name}</Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p" style={{textAlign: 'justify'}}>
                        <span style={{fontWeight: 600}}><LocationOnIcon/> &nbsp; {location}</span> <br/>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
