import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import TasksResult from './tasks-result';
import ProjectsResult from './projects-result';

const SearchResults = ({tasksData,projectsData}) => {
    const [tasks,setTasks] = useState(tasksData);
    const [projects,setProjects] = useState(projectsData);

    return (
        <Box 
            fullWidth
            padding='10px'
            display='flex'
            flexDirection='row'
            alignContent='flex-start'
            alignItems='flex-start'
            sx={{
                border: '2px solid rgba(50,50,50,0.5)',
                borderRadius: '10px',
                minHeight: '500px',
                width:'90%'
            }}            
        >
            {
                tasks?
                <TasksResult tasks= {tasks}/>:
                null
            }
            {
                projects?
                <ProjectsResult projects = {projects}/>:
                null
            }
        </Box>
    );
};

export default SearchResults;