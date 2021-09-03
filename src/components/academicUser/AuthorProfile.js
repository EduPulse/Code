import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, Button, CardContent, Card, Avatar, TextField } from '@material-ui/core';
import Posts from '../posts';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 100,
    width: '60%',
    marginLeft: 300,
    borderRadius: 30,
  },
  avatar: {
    backgroundColor:'#935FF9',
    marginBottom: '20px',
    width: 80,
    height: 80,
  },
  buttonStyleMain: {
    backgroundColor: '#4411A8',
    color: '#FFFFFF',
    width: '150px',
    marginTop: '20px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#935FF9',
    },
  },
  buttonStyleCancel: {
    backgroundColor: '#FA2C2C',
    color: '#FFFFFF',
    marginRight: '20px',
    marginLeft: '120px',
    marginTop: '20px',
    marginBottom: '10px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#A50000',
    },
  },
  linkStyles: {
      color: '#FFFFFF',
      textDecoration: 'none',
      '&:hover': {
        color: '#FFFFFF',
        textDecoration: 'none',
      }
  },
  typographyStyle: {
    textAlign: 'center',
  },
  secondGrid: {
    marginTop: 10,
    marginLeft: 30,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#4411A8',
  },
  modlaLabel: {
    fontSize: '20px'
  },
  modalInput: {
    marginLeft: '10px',
    width: '450px',
    borderRadius: '4px',
  },
});

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px'
  },
};

function AuthorProfile ({ userID, authorID }) {
  
  const [authorData, setAuthorData] = useState([]);
  authorID = "60ed8d6597a4670ca060ed6b";
  const authorInfo = {"_id": authorID};
  console.log(authorInfo);

  const urlGetAuthorProfile = "http://localhost:9000/get_authorProfile/";
  useEffect(() => {
    axios.post(urlGetAuthorProfile, authorInfo).then(function (response) {
      setAuthorData(response.data);
    }).catch(function () {
      console.error("Author profile loading failed");
    })
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const [reason, setReason] = useState('');
  const handleReport = () => {
    let report = {
      "report_title": "Author report",
      "report_reason": reason,
      "reported_by": userID,
      "reported_author": authorID,
    }
    console.warn("report", report);
    setModalIsOpen(false);

    const urlReportAuthor = "http://localhost:9000/report_author";
    axios.post(urlReportAuthor, report ).then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'Your report has been recorded successfully',
        timer: 1500
      })
      console.log('Author profile is reported');
    }).catch(function () {
      Swal.fire({
        icon: 'error',
        title: 'Sorry!',
        text: 'Something went wrong. Try again later.'
      })
      console.error("Author profile report is failed");
    })
  }

  return (
    <div>
      <div>
        <Card className={useStyles().root}>
          <CardContent >
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Avatar alt="Profile image" className={useStyles().avatar} src={authorData.profilePicture} />
              </Grid>
            </Grid>

            <Typography gutterBottom variant="h5" component="h2" className={useStyles().typographyStyle}  > Name:
              {authorData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
              <p>Bio: {authorData.bio}</p>
              {/* <p>{authorData.university}</p>
              <p>{authorData.faculty}</p> */}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              <Grid item >
                <Button className={useStyles().buttonStyleMain} >Follow</Button>
              </Grid>
              <Grid item >
                <Button className={useStyles().buttonStyleCancel} onClick={openModal} >Report</Button>
              </Grid>
            </Grid>

          </CardContent>
          </Card>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            
            <Grid >
              <Grid item alignContent="center" >
                <h2 className={useStyles().modalTitle}>Report the author</h2>
              </Grid>
              {/* <Grid item xs={2}>
                <HighlightOffIcon onClick={closeModal}/>
              </Grid> */}
            </Grid>
            <Grid>
              <form>
                <Grid item>
                  <label className={useStyles().modlaLabel}>Reason*</label>
                  <TextField className={useStyles().modalInput} required value={reason} onChange={(e)=>{setReason(e.target.value)}} />
                </Grid>
                <Grid item>
                  <Button className={useStyles().buttonStyleCancel} onClick={handleReport} >Report</Button>
                  <Button className={useStyles().buttonStyleMain} onClick={closeModal} >Cancel</Button>
                </Grid>
              </form>
            </Grid>
          </Modal>
      </div>

      <div>
        <Grid className={useStyles().secondGrid} container spacing={3} justifyContent="center">
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p"className={useStyles().typographyStyle}  >
                  {/* <p>{userData.posts.lenght} posts created</p> */}
                  <p>20 posts created</p>
                  {/* <p>{userData.followingTags.lenght} tags following</p> */}
                  <p>10 tags following</p>
                  {/* <p>{userData.followedBy.lenght} followers</p> */}
                  <p>200 followers</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item  >
            <Posts />
            <Posts />
            <Posts />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AuthorProfile