import React ,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';

const ProjectView = ({ open, onClose,projectId, project }) => {

    const [openProjectView, setOpenProjectView] = useState(false);
    const [projectStatus,setProjectStatus] = useState(project.status);
    const [startDate,setStartDate] = useState(project.start);
    const [targetDate,setTargetDate] = useState(project.target);
    
    
    const handleStatusDropdown = (currentStatus) =>{
      updateProjectDetails({
        'status': currentStatus
      })
      window.location.reload()
    }
    const handleTargetDateChange = (date) => {
        setTargetDate(date);
        updateProjectDetails({
          'start': date
        })
    }
    const handleStartDateChange = (date) =>{
        setStartDate(date)
        updateProjectDetails({
          'target': date
        })
    } 
    const updateProjectDetails = (data) =>{
      const url = `http://localhost:5000/project/${projectId}`;
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
                    {projectId}
                </Typography>
                <Typography marginLeft='10px' variant="h6" color='primary'>
                    { project && project.title}
                </Typography>
            </Box>
            <Box display='flex' marginTop={2} width='95%' flexDirection='row' alignContent='flex-start' alignItems='center'>
                <StatusDropdown status={projectStatus} handleStatusDropdown={handleStatusDropdown} width='30%' />
                <Box marginLeft={2} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
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
                    {project && project.description}
                </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default ProjectView;
