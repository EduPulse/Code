import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {animated, useSpring} from 'react-spring';
import PropTypes from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper2: {
        backgroundColor: '#DFDAE8',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '80vw',
        height: '80vh',
        overflowY: 'scroll',
    }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const {in: open, children, onEnter, onExited, ...other} = props;
    const style = useSpring({
        from: {opacity: 0},
        to: {opacity: open ? 1 : 0},
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

function PostViewer(props) {
    const classes = useStyles();
    const [viewPost, setviewPost] = useState(false);
    const openPost = () => {
        setviewPost(true);
    };

    const closePost = () => {
        setviewPost(false);
    };
    const postedDate = formatDistanceToNow(new Date(props.data.createdAt)) + ' ago'
    return (
        <div>
            <IconButton>
                <ExpandMoreIcon onClick={openPost}/>
            </IconButton>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={viewPost}
                onClose={closePost}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewPost}>
                    <div className={classes.paper2}>
                        <Grid container spacing={5} style={{marginTop: '30px', marginBottom: '30px'}}>

                            <Grid item xs style={{}}>
                                <center>
                                    <Avatar
                                        aria-label="user"
                                        src={props.data.author.profilePicture}
                                        style={{width: '150px', height: '150px'}}
                                    />

                                    <div>
                                        <Typography variant="h5" color="textPrimary" component="p"
                                                    style={{margin: '10px 0'}}>
                                            {props.data.author.name}
                                        </Typography>
                                    </div>

                                    <div style={{margin: '20px 0'}}>
                                        <ThumbUpIcon style={{width: '40px', height: '40px'}}/>
                                        <Typography variant="h5" color="textPrimary" component="p">
                                            {props.data.article.upvotes.length}
                                        </Typography>

                                    </div>

                                    <div style={{margin: '20px 0'}}>
                                        <VisibilityIcon style={{width: '40px', height: '40px'}}/>
                                        <Typography variant="h5" color="textPrimary" component="p">
                                            {props.data.viewCount}
                                        </Typography>

                                    </div>


                                </center>
                            </Grid>

                            <Grid item xs={8}
                                  style={{border: '1px solid #DBDBDB', borderRadius: '15px', backgroundColor: 'white'}}>

                                <div style={{borderBottom: '1px solid #DBDBDB'}}>
                                    {/* <img alt="postimage"
                                        src={props.data.article.current.coverImage}
                                        style={{maxWidth: '100%',height: '100px',borderRadius:'10px'}}
                                        /> */}
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${props.data.article.current.coverImage})`,
                                        borderRadius: '10px',
                                        backgroundSize: 'cover'
                                    }}/>
                                    <Typography variant="h4" color="textPrimary" component="p" style={{margin: '10px'}}>
                                        {props.data.article.current.title}
                                    </Typography>

                                    <div align="right" style={{color: 'grey'}}>{postedDate}</div>

                                    {/* {new Date(props.data.createdAt).toLocaleString()} */}
                                </div>


                                <div dangerouslySetInnerHTML={{__html: props.data.article.current.content}}/>

                            </Grid>

                        </Grid>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default PostViewer;