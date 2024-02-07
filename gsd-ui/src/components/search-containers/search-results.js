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
            alignContent='center'
            alignItems='flex-start'            
        >
            <TasksResult tasks= {tasks}/>:
            {
                projectsData?
                <ProjectsResult projects = {projects}/>:
                null
            }
        </Box>
    );
};

export default SearchResults;