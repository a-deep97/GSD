import React from 'react';
import {Box} from '@mui/material';

import ProjectListContainer from './project-list-container';

const ProjetsContainer = () => {
    return (
        <Box alignSelf='center' display='flex' flexDirection='row' alignContent='flex-start' alignItems='center'>
                <ProjectListContainer/>
                <ProjectListContainer/>
                <ProjectListContainer/>
                <ProjectListContainer/>
                <ProjectListContainer/>
        </Box>
    );
};

export default ProjetsContainer;