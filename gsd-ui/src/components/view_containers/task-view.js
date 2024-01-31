import React from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TaskView = ({ open, onClose, task }) => {
//  const classes = useStyles();

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
        <Card  style={{
            width:'700px',
            height: '550px'
            }}>
          <IconButton  onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h5" component="h2">
              {task.title}
            </Typography>
            <Typography variant="body2" component="p">
              Task Number: {task.taskNumber}
            </Typography>
            <Typography variant="body2" component="p">
              Task Status: {task.status}
            </Typography>
            <Typography variant="body2" component="p">
              Target: {task.target}
            </Typography>
            <Typography variant="body2" component="p">
              Start Date: {task.startDate}
            </Typography>
            <Typography variant="body2" component="p">
              Project Attached: {task.project}
            </Typography>
            <Typography variant="body2" component="p">
              Owner: {task.owner}
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default TaskView;
