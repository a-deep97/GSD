import React from 'react';
import { Box } from '@mui/material';

import TasksResult from './tasks-result';
import ProjectsResult from './projects-result';

const SearchResults = ({tasks,projects}) => {
    return (
        <Box fullWidth
            padding='10px'
        >
            <TasksResult tasks= {tasks}/>
            <ProjectsResult projects = {projects}/>
        </Box>
    );
};

export default SearchResults;