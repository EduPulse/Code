import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

import { makeStyles, CardContent, Card, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block', 
  },
  cardStyle: {
      marginBottom: '30px',
      borderRadius: '10px',
  },
  controlStyle: {
    backgroundColor: '#C5B6E3',
  },
}));

function SocialProfileForm () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.cardStyle}>
        <CardContent>
          <Form>
              <Form.Group>
                  <Form.Label >Twitter</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>

              <Form.Group>
                  <Form.Label >Facebook</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>

              <Form.Group>
                  <Form.Label>LinkeIn</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Github</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Personal Website</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Medium</Form.Label>
                  <Form.Control className={classes.controlStyle} type="text" />
              </Form.Group>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SocialProfileForm