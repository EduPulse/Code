import React from 'react'
import NavBarWP from "./navBarWP";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea, CardActions} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
    },
    media: {
        height: 250,
    },
    previewer: {
        paddingTop: 120,
        // width: "50%",
        paddingBottom: 50,
        margin: "auto"
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
    }
}));

export default function PreviewArticle() {
    const classes = useStyles();
    return (
        <div>
            <NavBarWP className={classes.navBar}/>

            <div align="center" className={classes.previewer}>
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
                            <div>
                                <p>In the project directory, you can run:</p>
                                <h2><strong>npm start</strong></h2>
                                <p>
                                    Runs the app in the development mode.<br />Open
                                    <a href="http://localhost:3000/">http://localhost:3000</a> to view it in the
                                    browser.
                                </p>
                                <p>
                                    The page will reload if you make edits.<br />You will also see any lint
                                    errors in the console.
                                </p>
                                <h3><strong>npm test</strong></h3>
                                <p>
                                    Launches the test runner in the interactive watch mode.<br />See the section
                                    about
                                    <a href="https://facebook.github.io/create-react-app/docs/running-tests\"
                                    >running tests</a
                                    >
                                    for more information.
                                </p>
                                <h3><strong>npm run build</strong></h3>
                                <p>
                                    Builds the app for production to the build folder.<br />It correctly bundles
                                    React in production mode and optimizes the build for the best performance.
                                </p>
                                <p>
                                    The build is minified and the filenames include the hashes.<br />Your app is
                                    ready to be deployed!
                                </p>
                                <p>
                                    See the section about
                                    <a href="https://facebook.github.io/create-react-app/docs/deployment\"
                                    >deployment</a
                                    >
                                    for more information.
                                </p>
                                <h3><strong>npm run eject</strong></h3>
                                <p>
                                    <strong
                                    >Note: this is a one-way operation. Once you eject, you can’t go
                                        back!</strong
                                    >
                                </p>
                                <p>
                                    If you aren’t satisfied with the build tool and configuration choices, you
                                    can eject at any time. This command will remove the single build dependency
                                    from your project.
                                </p>
                                <p>
                                    Instead, it will copy all the configuration files and the transitive
                                    dependencies (webpack, Babel, ESLint, etc) right into your project so you
                                    have full control over them. All of the commands except eject will still
                                    work, but they will point to the copied scripts so you can tweak them. At
                                    this point you’re on your own.
                                </p>
                                <p>
                                    You don’t have to ever use eject. The curated feature set is suitable for
                                    small and middle deployments, and you shouldn’t feel obligated to use this
                                    feature. However we understand that this tool wouldn’t be useful if you
                                    couldn’t customize it when you are ready for it.
                                </p>
                                <h2><strong>Learn More</strong></h2>
                                <p>
                                    You can learn more in the
                                    <a href="https://facebook.github.io/create-react-app/docs/getting-started\"
                                    >Create React App documentation</a
                                    >.
                                </p>
                                <p>
                                    To learn React, check out the
                                    <a href="https://reactjs.org/\">React documentation</a>.
                                </p>
                                <h3><strong>Code Splitting</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a href="https://facebook.github.io/create-react-app/docs/code-splitting\"
                                    >https://facebook.github.io/create-react-app/docs/code-splitting</a
                                    >
                                </p>
                                <h3><strong>Analyzing the Bundle Size</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a
                                        href="https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size\"
                                    >https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size</a
                                    >
                                </p>
                                <h3><strong>Making a Progressive Web App</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a
                                        href="https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app\"
                                    >https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app</a
                                    >
                                </p>
                                <h3><strong>Advanced Configuration</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a
                                        href="https://facebook.github.io/create-react-app/docs/advanced-configuration\"
                                    >https://facebook.github.io/create-react-app/docs/advanced-configuration</a
                                    >
                                </p>
                                <h3><strong>Deployment</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a href="https://facebook.github.io/create-react-app/docs/deployment\"
                                    >https://facebook.github.io/create-react-app/docs/deployment</a
                                    >
                                </p>
                                <h3><strong>npm run build fails to minify</strong></h3>
                                <p>
                                    This section has moved here:
                                    <a
                                        href="https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify\"
                                    >https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
                                    </a>
                                </p>
                            </div>
                        </div>
                    </CardActions>
                </Card>
            </div>

        </div>
    )
}
