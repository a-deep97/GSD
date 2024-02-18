import React ,{useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';
import ProjectInput from '../utilities/project-input';

import { jwtToken } from '../../lib/jwt';

const TaskView = ({ open, onClose,taskId ,task }) => {

    const [openTaskView, setOpenTaskView] = useState(open);
    const [taskStatus,setTaskStatus] = useState(task.status);
    const [startDate,setStartDate] = useState(task.start);
    const [targetDate,setTargetDate] = useState(task.target);
    const [description,setDescription] = useState(task.description);
    const [projectId,setProjectId] = useState(task.projectId? task.projectId : null);
    const [isProjectSearchActive ,setIsProjectSearchActive] = useState(false);

    const [saveButtonActive,setSaveButtonActive] = useState(false);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);    
    const handleOnclose = () =>{
      setOpenTaskView(false)
      onClose()
    }
    const handleStatusDropdown = (currentStatus) =>{
      setSaveButtonActive(true)
      setTaskStatus(currentStatus)
    }
    const handleTargetDateChange = (date) => {
      setTargetDate(date);
      setSaveButtonActive(true)
  }
  const handleStartDateChange = (date) =>{
      setStartDate(date)
      setSaveButtonActive(true)
  }
  const handleSave = (e) =>{
    e.preventDefault();
    debugger
    updateTaskDetails({
      'start': startDate,
      'target': targetDate,
      'status': taskStatus,
      'description': description
    })
    setSaveButtonActive(false);
  }
  const handleDescriptionChange = (updatedDescription) =>{
    setDescription(updatedDescription);
    setSaveButtonActive(true);
  }
  const handleDescriptionClick = () =>{
    setIsDescriptionEditing(true);
  }
  const handleInputBlur = () =>{
    setIsDescriptionEditing(false);
  }
  const handleProjectInput = (projectId) =>{
    
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
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + jwtToken()
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      .then(response => {
        debugger
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
        'align-items': 'center',
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
            width:'500px',
            height: '100vh'
            }}>
          <IconButton  onClick={handleOnclose}>
            <CloseIcon />
          </IconButton>
          <CardContent>
            {saveButtonActive? <Button 
                variant='contained'
                sx={{
                  width: '100px',
                  height: '30px',
                  marginBottom: '5px'
                }}
                onClick={handleSave}
              > Save
              </Button> :null }
            <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
              <Typography variant='h4' marginLeft='5px' color="textSecondary">
                  {taskId}
              </Typography>
              <Typography marginLeft='10px' variant="h6" color='black'>
                  { task && task.title}
              </Typography>
          </Box>
          <Box display='flex' 
            marginTop={2} width='97%' 
            flexDirection='row' 
            alignContent='flex-start' 
            alignItems='space-between' 
            justifyContent='space-between'>
              <Box display='flex' 
                flexDirection='column' 
                alignItems='center'
                justifyContent='space-around'
                width='200px'
                >
                <StatusDropdown status={taskStatus} handleStatusDropdown={handleStatusDropdown} width='70%'
                  sx={{
                      marginTop: '10px',
                      width: '90%'
                  }}
                />
                <ProjectInput currentValue = {projectId} setInputValue={handleProjectInput}/>
              </Box>
              <Box marginLeft={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='50%'>
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
            <Box 
              display={'flex'}
              flexDirection={'column'}
              overflow={'scroll'}
              sx={{
                margin: '10px',
                height: '400px',
                width: '100%',
                overflowX: 'hidden',
                scrollbarWidth: 'none'
              }}
            >
              <Box sx={{
                  textOverflow: 'ellipsis',
                  cursor: 'text'
                  }}
                  marginTop={2}
                  height={'auto'}
              > 
                <Box
                  sx={{
                    backgroundColor: '#f2f2f2',
                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                  width={'100%'}
                >
                  <Typography variant="subtitle1" color="textPrimary">
                    Description
                  </Typography>
                </Box>
                {isDescriptionEditing && (
                  <TextField
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    onBlur={handleInputBlur}
                    fullWidth
                    variant="outlined"
                  />
                )}
                {!isDescriptionEditing && (
                <Typography variant="body1"
                  onClick={handleDescriptionClick}
                >{description}</Typography>
              )}
              </Box>
              <Box
                sx={{
                  minHeight: '300px',
                  marginTop: '50px'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#f2f2f2',
                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                  width={'100%'}
                >
                  <Typography variant="subtitle1" color="textPrimary">
                    Activity and comments
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default TaskView;
