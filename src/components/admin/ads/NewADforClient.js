import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
//import { TextFieldsOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import {DropzoneArea} from 'material-ui-dropzone'
import swal from 'sweetalert';

const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',
        width:'600px',
        overflow:'scroll',
        margin:'20px 0'
      },
      formTitleContainer: {
        backgroundColor:'#4411A8',
        width:'80%',
        marginTop: '10px',
        borderRadius:'5px',
        padding:'5px 5px',
        marginBottom:'20px',
  
      },
      formTitle:{
        color:'white'
      },
      textfield: {
        margin: theme.spacing(1,2,1,0)
      },
      formControl: {
        margin: theme.spacing(1,0),
        minWidth: 250,
      },
      newad:{
        marginTop:'20px',
        borderRadius:'50px'
    },
}));

export const NewADforClient = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    }; 

    const handleClose = () => {
      setOpen(false);
    };


    const classes = useStyles();

    const [adForm, setAdForm] = useState({advertType:'',adpackage:0,startDate:'',endDate:'',redirectLink:'',description:''})

    const handleChange = e=>{
      setAdForm(prevState => ({
        ...prevState, [e.target.name]:e.target.value
      }))
    }

    const [files, setfiles] = useState(null)
    const handlefileChange = ([file])=>{
      file && setfiles(file)
      //console.log(files)
    }
    const [progress, setProgress] = useState(null)
    const [currentlyUploading, setCurrentlyUploading] = useState(false)

    const handleSubmit = (e)=>{
      e.preventDefault();

      const formData = new FormData();
      formData.append("client",props.client);
      formData.append("advertType",adForm.advertType);
      formData.append("adpackage",adForm.adpackage);
      formData.append("startDate",adForm.startDate);
      formData.append("endDate",adForm.endDate);
      formData.append("redirectLink",adForm.redirectLink);
      formData.append("description",adForm.description);
      formData.append("media",files,files.name);

      axios({
        method: "put",
        url: 'http://localhost:9000/ad/same_client_new',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
        }

      })
      .then(function (response) {
        swal("Ad saved successfully", "", "success");
        console.log(response)
        setAdForm({advertType:'',adpackage:0,startDate:'',endDate:'',redirectLink:'',description:''})
        setfiles(null)
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
    }

    return (
        <div style={{display:"table-cell"}}>
            <Tooltip title="Create New Ad for this Client">
                <IconButton aria-label="Create New Ad for this Client">
                    <AddCircleIcon style={{color:'green'}} onClick={handleOpen}/>
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

                  <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                  <div style={{display:'flex',justifyContent:'center'}}>
                    <div className={classes.formTitleContainer}>
                        <h2 className={classes.formTitle} align="center">Publish New Ad</h2>
                    </div>
                  </div>
                  

                    <h4>Advertisment Details</h4>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Advertisment type</InputLabel>

                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Advertisment type"
                        name="advertType"
                        onChange={handleChange}
                        defaultValue={""}
                      >
                        <MenuItem value={"Image"} defaultValue>Image</MenuItem>
                        <MenuItem value={"Video"}>Video</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Package</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Advertisment type"
                        name="adpackage"
                        onChange={handleChange}
                        defaultValue={""}
                      >
                        <MenuItem value={1} defaultValue>Package 1</MenuItem>
                        <MenuItem value={2}>Package 2</MenuItem>
                        <MenuItem value={3}>Package 3</MenuItem>
                        <MenuItem value={4}>Package 4</MenuItem>
                      </Select>
                    </FormControl>
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between'}}>

                    <TextField
                      id="datetime-local"
                      label="Start Date"
                      type="date"
                      defaultValue="2021-08-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="startDate"
                      onChange={handleChange}
                    />

                    <TextField
                      id="datetime-local"
                      label="End Date"
                      type="date"
                      defaultValue="2021-08-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="endDate"
                      onChange={handleChange}
                    />
                    </div>

                    <div>
                    <TextField
                      id="outlined-full-width"
                      label="Redirect Link"
                      fullWidth
                      variant="outlined"
                      className={classes.textfield}
                      value={adForm.redirectLink}
                      name="redirectLink"
                      onChange={handleChange}
                    />
                    </div>

                    <div>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                      className={classes.textfield}
                      value={adForm.description}
                      name="description"
                      onChange={handleChange}
                    />
                    </div>

                    <DropzoneArea
                      onChange={handlefileChange}
                      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp' ,'video/mp4','video/mkv']}
                      maxFileSize={50000000}
                      filesLimit={1}
                      showFileNamesInPreview={true}
                      filename="media"
                    />


                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      type="submit"
                    >
                      Post Ad
                    </Button>

                  </form>
                </div>
              </Fade>
            </Modal>
        </div>
    )
}
