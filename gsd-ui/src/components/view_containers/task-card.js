import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography,MenuItem, Box, FormControl,InputLabel,Select, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ExpandLess,ExpandMore} from '@mui/icons-material';

import TaskView from './task-view';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';
import DateType from '../../constants/date-type';
import StatusColorCode from '../../constants/status-color';
import Status from '../../constants/status';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TaskCard = ({taskId,task}) => {

    const [expanded,setExpanded] = useState(false);
    const [openTaskView, setOpenTaskView] = useState(false);
    const [taskStatus,setTaskStatus] = useState(task.status);
    const [startDate,setStartDate] = useState(task.start);
    const [targetDate,setTargetDate] = useState(task.target);

    useEffect(()=>{
        setTaskStatus(task.status)
        setStartDate(task.start)
        setTargetDate(task.target)
    });
    const handleClick = () =>{
        setOpenTaskView(true);
    }
    const onTaskClose = () =>{
        setOpenTaskView(false);
        window.location.reload()
    }
    const handleStatusDropdown = (currentStatus) =>{
        setTaskStatus(currentStatus)
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
    const handleExpansion = (e) =>{
        e.stopPropagation();
        setExpanded(!expanded);
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
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',       
            justifyContent: 'center' 
        }}>
            <Card 
                sx={{
                    width: '95%',
                    padding:'0px',
                }} 
                variant="outlined" 
                onClick={handleClick}
            >
                <CardContent 
                    display='flex' 
                    flexDirection='column'
                    sx={{
                        height: expanded ? '150px' : '70px',
                        transition: 'height 0.5s ease-in-out'
                    }}
                >
                    <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
                        <Typography marginLeft='5px' color="textSecondary"
                            sx={{
                                fontWeight: 'bold'
                            }}
                        >
                            {taskId}
                        </Typography>
                        <Typography marginLeft='10px' 
                            variant="subtitle" 
                            sx={{ overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                            }}
                        >
                            {task && task.title}
                        </Typography>
                    </Box>
                    <Box display='flex' 
                        flexDirection='row' 
                        alignContent='flex-start' 
                        alignItems='center'
                    >
                        <Typography variant="subtitle" color='tertiary' component="p" width='50%'
                            sx={{ overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' 
                        }}
                        >
                            {task.projectId ?task.projectId:'None'}
                        </Typography>
                        <StatusDropdown status={taskStatus} handleStatusDropdown={handleStatusDropdown}/>
                    </Box>
                    <IconButton 
                        onClick={handleExpansion}
                        sx={{
                            width: '90%',
                            padding: '0px'
                        }}
                    >
                        {
                            expanded? <ExpandLess/> : <ExpandMore/>
                        }
                    </IconButton>
                    {
                        expanded?
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                            <CustomDatePicker Date={startDate} handleDateChange={handleTargetDateChange} dateType={DateType.START}/>
                            <CustomDatePicker Date={targetDate} handleDateChange={handleStartDateChange} dateType={DateType.TARGET}/>
                        </Box>:
                        null
                    }
                </CardContent>
            </Card>
            {
                openTaskView ?
                <TaskView open={openTaskView} onClose={onTaskClose} taskId={taskId} task={task}/> :
                null
            }
        </Box>
    );
};

export default TaskCard;
