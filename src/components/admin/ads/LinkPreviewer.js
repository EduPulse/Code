import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ReactPlayer from 'react-player'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
}));


export const LinkPreviewer = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{display: "table-cell"}}>
            <Tooltip title="Preview Ad">
                <IconButton aria-label="Preview Ad">
                    <LaunchIcon onClick={handleOpen}/>
                </IconButton>
            </Tooltip>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                        <a href={props.href} className="link-with-preview">
                            <span> {props.children} </span>
                            {(
                                <Card image={props.image}
                                      type={props.type}/* title={props.title} text={props.text} */ />
                            )}
                        </a>
                    </div>
                </Fade>
            </Modal>
        </div>


    );
};

const Card = props => {
    return (
        <div className="card">
            {(props.type === "Image") ? (
                <img src={props.image} className="card-img-top" alt="" style={{width: '600px'}}/>
            ) : <ReactPlayer url={props.image} playing={true} controls={true}/>}

            {/*       <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
      </div> */}

        </div>
    );
};