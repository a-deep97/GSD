import React from 'react';
import {Box} from '@mui/material';

import TopNavbar from './utilities/top-navbar';
import TasksContainer from './view_containers/tasks-container';

const TasksPage = () => {
    return (
        <Box display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
            <TopNavbar/>
            <TasksContainer/>
        </Box>
    );
};

export default TasksPage;