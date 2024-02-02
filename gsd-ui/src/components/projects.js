import React from 'react';
import {Box} from '@mui/material';

import TopNavbar from './utilities/top-navbar';
import ProjetsContainer from './view_containers/projects-container';
import CreateProjectButton from './buttons/create-project-button';

const ProjectsPage = () => {
    return (
        <Box display='flex' flexDirection='column' alignContent='flex-start' alignItems='center'>
            <TopNavbar/>
            <Box style={{
                    'width': '100%',
                }}
                display='flex'
                alignContent='flex-start'
                alignItems='center'
                marginTop={2}
                marginLeft={5}
                >
                <CreateProjectButton/>
            </Box>
            <ProjetsContainer/>
        </Box>
    );
};

export default ProjectsPage;