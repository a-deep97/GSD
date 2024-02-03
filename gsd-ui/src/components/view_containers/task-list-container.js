import React, { useEffect, useState } from 'react';
import {Box,Typography} from '@mui/material';
import Status from '../../constants/status';

import TaskCard from './task-card';

const TaskListContainer = ({tasks,status}) => {
    const [currentStatus, setCurrentStatus] = useState(status)
    const renderCards = () =>{
        const _tasks =  tasks.map(task =>{
            return <TaskCard taskId={task.taskId} task={task} />
        })
        return _tasks
    }
    return (
        <Box sx={{ 
            width: '95%', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            minHeight: '800px', 
            }}
            display='flex'
            flexDirection='column'
            alignItems='center'
            alignContent='flex-start'
            >
            <Box sx={{ 
                borderBottom: '1px solid #ccc', 
                marginBottom: '10px', 
                paddingBottom: '5px', 
                width: '100%',        
                }}
            >
            </Box>
            <Box paddingTop='5px' display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
                {renderCards()}
            </Box>
        </Box>
    );
};

export default TaskListContainer;