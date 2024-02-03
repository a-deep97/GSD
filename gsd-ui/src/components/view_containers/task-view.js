import React ,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';

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

const TaskView = ({ open, onClose,taskId ,task }) => {

    const [openTaskView, setOpenTaskView] = useState(false);
    const [taskStatus,setTaskStatus] = useState(task.status);
    const [startDate,setStartDate] = useState(task.start);
    const [targetDate,setTargetDate] = useState(task.target);
  
    const handleStatusDropdown = (currentStatus) =>{
      updateTaskDetails({
        'status': currentStatus
      })
      window.location.reload()
    }
    const handleTargetDateChange = (date) => {
      setTargetDate(date);
      updateTaskDetails({
        'start': date
      })
  }
  const handleStartDateChange = (date) =>{
      setStartDate(date)
      updateTaskDetails({
        'target': date
      })
  } 
  const updateTaskDetails = (data) =>{
    const url = `http://localhost:5000/task/${taskId}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Response:', data);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
    }
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
          <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
                <Typography variant='h4' marginLeft='5px' color="textSecondary">
                    T{taskId}
                </Typography>
                <Typography marginLeft='10px' variant="h6" color='primary'>
                    { task && task.title}
                </Typography>
            </Box>
            <Box display='flex' marginTop={2} width='97%' flexDirection='row' alignContent='flex-start' alignItems='center'>
                <Typography variant="body2" component="p" width='30%'
                    sx={{ overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' ,
                    width: '30%'
                }}
                >
                    {task && task.project}
                </Typography>
                <StatusDropdown status={taskStatus} handleStatusDropdown={handleStatusDropdown} width='30%' />
                <Box marginLeft={2} display='flex' flexDirection='row' justifyContent='center' alignItems='center' width='50%'>
                    <Box marginLeft='5px' display='flex' flexDirection='column' alignContent='center' alignItems='flex-start'>
                        <Typography variant='caption'>
                            start
                        </Typography>
                        <CustomDatePicker Date={startDate} handleDateChange={handleTargetDateChange}/>
                    </Box>
                    <Box marginLeft='5px' display='flex' flexDirection='column' alignContent='center' alignItems='flex-start'>
                        <Typography variant='caption'>
                            target
                        </Typography>
                        <CustomDatePicker Date={targetDate} handleDateChange={handleStartDateChange}/>
                    </Box>
                </Box>
            </Box>
            <Box style={{
                height: '100px',
                textOverflow: 'ellipsis',
                }}
                marginTop={2}
            >
                <Typography variant='caption'>
                    {task && task.description}
                </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default TaskView;
