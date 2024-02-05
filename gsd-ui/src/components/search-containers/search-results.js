import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import TasksResult from './tasks-result';
import ProjectsResult from './projects-result';

const SearchResults = ({tasksData,projectsData}) => {
    const [tasks,setTasks] = useState(tasksData);
    const [projects,setProjects] = useState(projectsData);

    useEffect(()=>{
        console.log('tasks',tasks)
        console.log('projects',projects)
    },[]);
    return (
        <Box 
            fullWidth
            padding='10px'
            display='flex'
            flexDirection='row'
            alignContent='center'
            alignItems='center'            
        >
            <TasksResult tasks= {tasks}/>
            <ProjectsResult projects = {projects}/>
        </Box>
    );
};

export default SearchResults;