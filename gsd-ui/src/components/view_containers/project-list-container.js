import React from 'react';
import {Box} from '@mui/material';

import ProjectCard from './project-card';

const ProjectListContainer = () => {
    return (
        <Box marginTop={2} paddingTop={3} display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
            <ProjectCard/>
        </Box>
    );
};

export default ProjectListContainer;