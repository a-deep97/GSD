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
            width: '100%', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            minHeight: '800px', 
            }}

            >
            <Box 
                paddingTop='10px' 
                display='flex' 
                width='100%'
                flexDirection='column' 
                alignContent='flex-start' 
                alignItems='center'>
                {renderCards()}
            </Box>
        </Box>
    );
};

export default TaskListContainer;