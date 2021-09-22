import React from 'react'
import { Button,makeStyles, Card, Grid, CardMedia, Typography, CardHeader, CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius:'5px',
        marginTop:'100px',
        maxWidth: '77%',
        marginLeft: '150px',
        // height: '400px'
        marginBottom: '20px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        borderRadius: 5,
        margin: 10,
    },
    mainClass: {
        backgroundColor: '#FFFFFF',
        height: '1400px',
        marginBottom: '30px'
    },
    subCardOne: {
        backgroundColor: '#935FF9',
        height: '300px',
        width: '50%',
        marginTop: '4%',
        marginLeft: '45%',
        position: 'relative',
        top: 0,
        left: 0
    },
    subCardTwo: {
        position: 'absolute',
        marginTop: '190px',
        width: '50%',
        top: '30px',
        left: '370px',
    },
    introCard1: {
        position: 'absolute',
        marginTop: '190px',
        width: '200px',
        top: '30px',
        left: '160px',
        textAlign: 'center',
    },
    heading: {
        color: '#935FF9',
        marginLeft: '2%',
        marginTop: '2%',
        fontSize: '28px',
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    description: {
        color: '#4411A8',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px'
    },
    introCard2: {
        position: 'absolute',
        marginTop: '600px',
        width: '600px',
        top: '30px',
        left: '180px',
        textAlign: 'center',
    },
    imgCardTwo: {
        position: 'absolute',
        marginTop: '170px',
        width: '300px',
        left: '770px',
    },
    introCard3: {
        position: 'absolute',
        marginTop: '800px',
        width: '500px',
        top: '30px',
        left: '560px',
        textAlign: 'center',
    },
    imgCardThree: {
        position: 'absolute',
        marginTop: '330px',
        width: '350px',
        left: '200px',
    },
    teamMates: {
        position: 'absolute',
        marginTop: '580px',
        backgroundColor: '#935FF9',
        width: '975px',
        marginBottom: '30px'
    },
    teamHeading: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '10px',
        fontWeight: 'bold',
        marginTop: 10
    },
    teamMatesCard: {
        marginLeft: 15,
        marginRight: 15,
        width: 'auto',
        backgroundColor: '#935FF9',
        marginBottom: '30px'
    },
    teamMatesGrid: {

    },
    avatar: {
        width: 80,
        height: 80,
        marginLeft: 5
    },
    avatarName: {
        fontSize: '20px',
        textAlign: 'center'
    },
    contact: {
        marginTop: '20px',
        height: 100
    },
    emailText: {
        fontSize: '20px',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#935FF9'
    }
}));

function AboutUs() {
    const classes = useStyles();
    const logo = "../assets/EduPulse.png";

    return (
        <div className={classes.root}>
            <Card className={classes.mainClass}>
                <div>
                    <Card className={classes.subCardOne}>
                    </Card>

                    <Card className={classes.subCardTwo}>
                        <CardMedia
                            className={classes.media}
                            image="https://cdn.dribbble.com/users/1627881/screenshots/10966683/media/b0ebd0da2f2db3494d13596a3cfc1110.jpg?compress=1&resize=1600x1200"
                            title="Learn Online"
                        />
                    </Card>

                    <div className={classes.introCard1}>
                        <Typography className={classes.heading}>
                            The Heart of the Learning Community
                        </Typography>

                        <Typography  className={classes.description}>
                            We’re on a mission to build the best community for FREE sharing and accessing of learning materials with quality content.
                        </Typography>
                    </div>
                </div>
                <div>
                    <Card className={classes.imgCardTwo}>
                        <CardMedia
                            className={classes.media}
                            image="https://cdn.dribbble.com/users/1093429/screenshots/14563523/media/8599702867055e5da624602a109b3c00.gif"
                            title="Learn Online"
                        />
                    </Card>
                    <div className={classes.introCard2}>
                        <Typography className={classes.heading}>
                            Open to any subject area
                        </Typography>

                        <Typography  className={classes.description}>
                            EduPulse is not simply limited to one TextField.
                            We present resources of different areas like technology, history, music...
                            and the list goes on and on ...
                        </Typography>
                    </div>
                    <div className={classes.introCard3}>
                        <Typography className={classes.heading}>
                            University Community is mostly welcomed!
                        </Typography>

                        <Typography  className={classes.description}>
                            All the undergraduates and lecturers of local universities are welcomed 
                            in EduPulse to share what they know. We use them for the quality control of
                            the content that we share in our platform
                        </Typography>
                    </div>
                    <Card className={classes.imgCardThree}>
                        <CardMedia
                            className={classes.media}
                            image="https://cdn.dribbble.com/users/1162077/screenshots/2982814/media/2d1c782d9f662bb67547099fb62f019b.png?compress=1&resize=800x600"
                            title="Learn Online"
                        />
                    </Card>
                </div>
                <div className={classes.teamMates}>
                    <Typography className={classes.teamHeading}>
                        EduPulse is bringing to you by us: undergraduates at UCSC!
                    </Typography>
                    
                    <Card className={classes.teamMatesCard}>
                        <Grid container spacing={4} className={classes.teamMatesGrid}>
                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Profile image"
                                                src="https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=1600x1200" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>Chathura</Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">BSc. in (Hons) Computer Science</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Profile image"
                                                src="https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=1600x1200" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>Mahela</Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">BSc. in Computer Science</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Profile image"
                                                src="https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=1600x1200" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>Chathumi</Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">BSc. (Hons) in Software Engineering</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Profile image"
                                                src="https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=1600x1200" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>Devshan</Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">BSc. in Information Systems</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Profile image"
                                                src="https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=1600x1200" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>Chalaka</Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">BSc. (Hons) in Computer Science</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar 
                                                aria-label="recipe" className={classes.avatar}
                                                alt="Email us"
                                                src="https://cdn.dribbble.com/users/146798/screenshots/4849612/media/337827baf680d7bd570d499f84a2ad5a.png?compress=1&resize=800x600" 
                                            />
                                        }
                                    />
                                    <CardContent>
                                        <Typography className={classes.avatarName}>We are team EduPulse</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Card className={classes.contact}>
                            <CardContent>
                                <Typography className={classes.emailText} >Feel free to contact us via mails: edupulse27@gmail.com</Typography>
                            </CardContent>
                        </Card>
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default AboutUs
