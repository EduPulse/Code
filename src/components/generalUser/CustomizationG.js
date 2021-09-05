import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Grid, CardMedia, makeStyles, Typography, CardContent, Card,  } from '@material-ui/core';

//https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/

const useStyles = makeStyles((theme) => ({
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#DFDAE8',
    },
    nightCard: {
        backgroundColor: '#4411A8',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    dayCard: {
        backgroundColor: '#FFFFFF',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#935FF9',
        width: '80%',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#4411A8',
        },
        marginBottom: '10px'
    },
}));

function Customization() {
    return (
        <div>
            <Card className={useStyles().cardStyle}>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2" align="left">Site Theme</Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={5} >
                            <Card className={useStyles().nightCard}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h3">Dark Theme</Typography>
                                    <CardMedia
                                        image="https://cdn.digitbin.com/wp-content/uploads/Dark-Mode-in-Google-Search-Results.png"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={5} >
                            <Card className={useStyles().dayCard}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h3">Day Theme</Typography>
                                    <CardMedia
                                        image="https://www.turnoffthelights.com/blog/wp-content/uploads/2017/02/Light-Chrome-theme-1024x640.png"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default Customization