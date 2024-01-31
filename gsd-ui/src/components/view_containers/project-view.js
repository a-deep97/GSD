import React from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const ProjectView = ({ open, onClose, project }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      style={{
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }}
    >
      <Fade in={open}>
        <Card style={{
            width:'700px',
            height: '550px'
            }}
            >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h5" component="h2">
              {project.title}
            </Typography>
            <Typography variant="body2" component="p">
              Project Number: {project.projectNumber}
            </Typography>
            <Typography variant="body2" component="p">
              Project Status: {project.status}
            </Typography>
            <Typography variant="body2" component="p">
              Target: {project.target}
            </Typography>
            <Typography variant="body2" component="p">
              Start Date: {project.startDate}
            </Typography>
            <Typography variant="body2" component="p">
              Owner: {project.owner}
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default ProjectView;
