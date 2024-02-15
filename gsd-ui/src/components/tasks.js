import React from 'react';
import {Box} from '@mui/material';

import TopNavbar from './utilities/top-navbar';
import TasksContainer from './view_containers/tasks-container';
import CreateTaskButton from './buttons/create-task-button';

const TasksPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'center',
        }}>
            <TopNavbar/>
            <Box style={{
                    'width': '100%',
                }}
                display='flex'
                alignContent='flex-start'
                alignItems='center'
                marginTop={2}
                >
                    <CreateTaskButton/>
            </Box>
            <TasksContainer/>
        </Box>
    );
};

export default TasksPage;