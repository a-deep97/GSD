import React from 'react';
import {Box} from '@mui/material';

import TaskListContainer from './task-list-container';

const TasksContainer = () => {
    return (
        <Box alignSelf='center' display='flex' flexDirection='row' alignContent='flex-start' alignItems='center'>
                <TaskListContainer/>
                <TaskListContainer/>
                <TaskListContainer/>
                <TaskListContainer/>
                <TaskListContainer/>
        </Box>
    );
};

export default TasksContainer;