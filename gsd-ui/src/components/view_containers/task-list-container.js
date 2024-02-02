import React from 'react';
import {Box} from '@mui/material';

import TaskCard from './task-card';

const TaskListContainer = ({tasks,status}) => {
    return (
        <Box marginTop={2} paddingTop={3} display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
            <TaskCard/>
        </Box>
    );
};

export default TaskListContainer;