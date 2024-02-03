import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography,MenuItem, Box, FormControl,InputLabel,Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TaskView from './task-view';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';
import DateType from '../../constants/date-type';
import StatusColorCode from '../../constants/status-color';

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
    const classes = useStyles();
    const [openTaskView, setOpenTaskView] = useState(false);
    const [taskStatus,setTaskStatus] = useState(task.status);
    const [startDate,setStartDate] = useState(task.start);
    const [targetDate,setTargetDate] = useState(task.target);


    const taskID = taskId
    const dummyTask = {
        title: 'Task Title',
        taskNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
      };
    const handleClick = () =>{
        setOpenTaskView(true);
    }
    const onTaskClose = () =>{
        setOpenTaskView(false);
    }
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
        <Box>
            <Card 
                style={{'margin':'5px', width: '95%', height:'170px'}} 
                variant="outlined" 
                onClick={handleClick}
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                }}
            >
                <CardContent>
                    <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
                        <Typography marginLeft='5px' color="textSecondary">
                            {dummyTask.taskNumber}
                        </Typography>
                        <Typography marginLeft='10px' variant="subtitle" color='primary'>
                            {dummyTask.title}
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignContent='flex-start' alignItems='center'>
                        <Typography variant="body2" component="p">
                            {dummyTask.project}
                        </Typography>
                        <StatusDropdown taskStatus={taskStatus} handleStatusDropdown={handleStatusDropdown}/>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                        <CustomDatePicker Date={startDate} handleDateChange={handleTargetDateChange} dateType={DateType.START}/>
                        <CustomDatePicker Date={targetDate} handleDateChange={handleStartDateChange} dateType={DateType.TARGET}/>
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
            {
                openTaskView ?
                <TaskView open={openTaskView} onClose={onTaskClose} task={dummyTask}/> :
                null
            }
        </Box>
    );
};

export default TaskCard;
