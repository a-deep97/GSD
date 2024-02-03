import React ,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';
import ProjectInput from '../utilities/project-input';


const TaskView = ({ open, onClose,taskId ,task }) => {

    const [openTaskView, setOpenTaskView] = useState(open);
    const [taskStatus,setTaskStatus] = useState(task.status);
    const [startDate,setStartDate] = useState(task.start);
    const [targetDate,setTargetDate] = useState(task.target);
    const [projectId,setProjectId] = useState(task.projectId? task.projectId : null);
    const [isProjectSearchActive ,setIsProjectSearchActive] = useState(false);
  
    const handleOnclose = () =>{
      setOpenTaskView(false)
      onClose()
    }
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
  const handleProjectFieldClick = () =>{
    setIsProjectSearchActive(true);
  }
  const handleProjectInput = (projectId) =>{
    /**
     * this method updates the project when selected 
     * from the search component and 
     */
    const formData = {
      'projectId': projectId,
      }
    const url = `http://127.0.0.1:5000/task/${taskId}`;
    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          console.log('Form data submitted successfully');
          setProjectId(projectId)
          setIsProjectSearchActive(false)
        } else {
          throw new Error('Failed to submit form data');
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch call
        console.error('Error:', error);
      });
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
          window.location.reload()
          openTaskView(true)
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
    }
  return (
    <Modal
      open={openTaskView}
      closeAfterTransition
      style={{
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }}
      slotProps={{
        Backdrop : {
          onClick: {onClose},
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }
      }}
    >
      <Fade in={openTaskView}>
        <Card  style={{
            width:'700px',
            height: '550px'
            }}>
          <IconButton  onClick={handleOnclose}>
            <CloseIcon />
          </IconButton>
          <CardContent>
          <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
                <Typography variant='h4' marginLeft='5px' color="textSecondary">
                    {taskId}
                </Typography>
                <Typography marginLeft='10px' variant="h6" color='primary'>
                    { task && task.title}
                </Typography>
            </Box>
            <Box display='flex' marginTop={2} width='97%' flexDirection='row' alignContent='flex-start' alignItems='center'>
                {
                  isProjectSearchActive?
                  <ProjectInput currentValue = {projectId} setInputValue={handleProjectInput}/>:
                  <Typography variant="h6" component="p" width='30%'
                      sx={{ overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' ,
                      width: '200px',
                      height: '40px',
                      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      }}
                      onClick={handleProjectFieldClick}
                    >
                      { projectId ?projectId : 'None'}
                    </Typography>
                }
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
