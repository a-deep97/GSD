import React from 'react';
import {Box} from '@mui/material';

import TopNavbar from './utilities/top-navbar';
import ProjetsContainer from './view_containers/projects-container';

const ProjectsPage = () => {
    return (
        <Box display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
            <TopNavbar/>
            <ProjetsContainer/>
        </Box>
    );
};

export default ProjectsPage;