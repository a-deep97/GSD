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

const TaskView = ({ open, onClose, task }) => {

    const [openTaskView, setOpenTaskView] = useState(false);
    const [taskStatus,setTaskStatus] = useState(null);
    const [startDate,setStartDate] = useState(null);
    const [targetDate,setTargetDate] = useState(null);
    const dummyTask = {
        title: 'Task Title',
        taskNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
      };
      
    
    const handleStatusDropdown = () =>{
        console.log('handle change')
    }
    const handleTargetDateChange = (date) => {
        setTargetDate(date);
    }
    const handleStartDateChange = (date) =>{
        setStartDate(date)
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
                    {dummyTask.taskNumber}
                </Typography>
                <Typography marginLeft='10px' variant="h6" color='primary'>
                    {dummyTask.title}
                </Typography>
            </Box>
            <Box display='flex' marginTop={2} width={700} flexDirection='row' alignContent='flex-start' alignItems='center'>
                <Typography variant="h6" component="p">
                    {dummyTask.project}
                </Typography>
                <StatusDropdown taskStatus={taskStatus} handleStatusDropdown={handleStatusDropdown}/>
                <Box marginLeft={5} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <Box marginLeft={2} marginRight={2} display='flex' flexDirection='column' alignContent='center' alignItems='flex-start'>
                        <Typography variant='caption'>
                            start
                        </Typography>
                        <CustomDatePicker Date={startDate} handleDateChange={handleTargetDateChange}/>
                    </Box>
                    <Box marginLeft={2} marginRight={2} display='flex' flexDirection='column' alignContent='center' alignItems='flex-start'>
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
                    {dummyTask.description}
                </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default TaskView;
