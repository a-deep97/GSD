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
import { useNavigate } from 'react-router-dom';
import DateType from '../../constants/date-type';
import Status from '../../constants/status';

const CreateProjectForm = ({formActive,setFormActive}) => {


    const navigate = useNavigate();
    const [title,setTitle] = useState('')
    const [projectStatus,setProjectStatus] = useState(Status.None);
    const [startDate,setStartDate] = useState('');
    const [targetDate,setTargetDate] = useState('');
    const [description,setDescription] = useState('');

    const handleStatusDropdown = (status) =>{
        setProjectStatus(status)
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
      const formData = {
        'title': title,
        'status': projectStatus,
        'description': description,
        'start' : startDate,
        'target' : targetDate
      }
      const url = 'http://127.0.0.1:5000/project';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            console.log('Form data submitted successfully');
            handleFormClose(false)
            window.location.reload()
          } else {
            throw new Error('Failed to submit form data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
            <Button type='submit' variant="contained" color="primary" size='small' onClick={handleSubmit}>
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
                P:
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
              <StatusDropdown
                status={projectStatus}
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
                    handleDateChange={handleStartDateChange}
                    dateType={DateType.START}
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
                    handleDateChange={handleTargetDateChange}
                    dateType={DateType.TARGET}
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

export default CreateProjectForm;
