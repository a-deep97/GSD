import React, { useState } from 'react';
import {
  Modal,
  Fade,
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';

import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';

const CreateTaskForm = ({formActive,setFormActive}) => {

    const dummyTask = {
        title: 'Task Title',
        taskNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
      };
    const [taskNumber,setTaskNumber] = useState('');
    const [title,setTitle] = useState('')
    const [taskStatus,setTaskStatus] = useState('');
    const [startDate,setStartDate] = useState('');
    const [targetDate,setTargetDate] = useState('');
    const [description,setDescription] = useState('');
    const [project,setProject] = useState('');
    const handleStatusDropdown = () =>{
        console.log('handle change')
    }
    const handleTargetDateChange = (date) => {
        setTargetDate(date);
    }
    const handleStartDateChange = (date) =>{
        setStartDate(date)
    }
    const handleFormClose = ()=>{
        setFormActive(false)
    } 
    const handleSubmit = () =>{
      console.log('saving...')
    }
  return (
    <Modal
      open={formActive}
      onClose={handleFormClose}
      closeAfterTransition
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Fade in={formActive}>
        <Card style={{ width: '700px', height: '550px' }}>
          <IconButton width='100%' onClick={handleFormClose}>
            <CloseIcon />
          </IconButton>
          <Box display='flex' flexDirection='row' marginLeft='20px'>
            <Button variant="contained" color="primary" size='small' onClick={handleSubmit}>
                Save
            </Button>  
          </Box>
          <CardContent>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              alignContent="flex-start"
              height="40px"
            >
              <Typography variant="h5" marginLeft="5px" color="textSecondary">
                T:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="title..."
                label = 'title'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                sx={{
                  marginLeft: '30px',
                  width: '500px',
                  '& .MuiInputBase-root': {
                    height: '40px', // Adjust the height of the input element
                  },
                  alignContent:'center'
                }}
               />
            </Box>
            <Box
              display="flex"
              marginTop={2}
              width={700}
              flexDirection="row"
              alignContent="flex-start"
              alignItems="center"
            >
              <TextField
                variant="outlined"
                label= "project"
                placeholder="attach project..."
                value={project}
                onChange={(e) => {
                  setProject(e.target.value);
                }}
                sx={{
                  marginLeft: '30px',
                  '& .MuiInputBase-root': {
                    height: '40px', // Adjust the height of the input element
                  },
                  alignContent:'center'
                }}
              />
              <StatusDropdown
                taskStatus={taskStatus}
                handleStatusDropdown={handleStatusDropdown}
              />
              <Box
                marginLeft={5}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  marginLeft={2}
                  marginRight={2}
                  display="flex"
                  flexDirection="column"
                  alignContent="center"
                  alignItems="flex-start"
                >
                  <Typography variant="caption">start</Typography>
                  <CustomDatePicker
                    Date={startDate}
                    handleDateChange={handleTargetDateChange}
                  />
                </Box>
                <Box
                  marginLeft={2}
                  marginRight={2}
                  display="flex"
                  flexDirection="column"
                  alignContent="center"
                  alignItems="flex-start"
                >
                  <Typography variant="caption">target</Typography>
                  <CustomDatePicker
                    Date={targetDate}
                    handleDateChange={handleStartDateChange}
                  />
                </Box>
              </Box>
            </Box>
            <div  style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              maxHeight: '300px',
              marginTop: '10px'
            }}>
                <TextField
                  id="filled-multiline-static"
                  label="description"
                  multiline
                  variant="filled"
                  rows ={8}
                  placeholder="description..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default CreateTaskForm;
