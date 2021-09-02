import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';

import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import Img2 from '../assets/EduPulse.png';
import { Icon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GoogleAuth from './OAuth/googleAuth.js';
import MsAuth from './OAuth/msAuth.js';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius:'15px',
    marginBottom:'20px'
  },
  media: {
    height: 0,
    margin:'0px 5px',
    borderRadius:'10px',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  likes: {
      paddingLeft : '5px',
      paddingRight: '40px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#DFDAE8',
    borderRadius: '15px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'250px',
    height:'400px'
  },
  logo:{
    width:'70px',
    height:'70px',
    borderRadius: '6px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px'
  },
  usericon:{
    width:'130px',
    height:'130px',
    display: 'block',
    margin: '20px auto',
  },
  authicons:{
    display: 'block',
    marginLeft: '17.5px',
    marginRight: 'auto',
    marginTop: '40px'
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
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

export default function Posts() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const url = 'http://localhost:9000/posts/feed'

  useEffect(() => {

    axios.get(url)
    .then(function (response) {
      console.log(response.data)
      setPosts(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [url])

  if (loading) {
    return <p>Data is loading...</p>;
  }

  return (

    <div>
    {posts.map((x)=> (x.type==="article" && x.article.status==="published" && x.visibility==="Anyone")?(
    <Card className={classes.root} key={uuidv4()}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={x.author.profilePicture} key={uuidv4()}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={x.author.name}
      //subheader={new Date(x.article.versions[0].createdAt).toLocaleString()}
        subheader={new Date(x.createdAt).toLocaleString()}
      />
      
      <CardMedia
        className={classes.media}
        image={x.article.current.coverImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">{x.article.current.title}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleOpen}>
          <ThumbUpIcon />
        </IconButton>
        <Typography className={classes.likes}>
          {x.article.upvotes.length}
        </Typography>

        <IconButton aria-label="views" onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
        <Typography className={classes.likes}>
          {x.viewCount} Views
        </Typography>

        <IconButton aria-label="share" onClick={handleOpen}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleOpen}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

    </Card>
    ):"")}
    <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={Img2} alt="logo" className={classes.logo}/>
            <Icon color="primary">
                <AccountCircleIcon className={classes.usericon}/>
            </Icon>
            
            <div className={classes.authicons} >
            <GoogleAuth/>
            <MsAuth/>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
    
  );
}
