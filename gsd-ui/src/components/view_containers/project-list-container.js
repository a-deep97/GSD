import React, { useEffect, useState } from 'react';
import {Box,Typography} from '@mui/material';
import Status from '../../constants/status';

import ProjectCard from './project-card';

const ProjectListContainer = ({projects,status}) => {
    const [currentStatus, setCurrentStatus] = useState(status)
    const renderCards = () =>{
        const _projects =  projects.map(project =>{
            return <ProjectCard projectId={project.projectId} project={project} />
        })
        return _projects
    }
    return (
        <Box sx={{ 
            width: '95%', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            minHeight: '800px', 
            }}
            display='flex'
            flexDirection='column'
            alignItems='center'
            alignContent='flex-start'
            >
            <Box paddingTop='5px' 
                display='flex' 
                width='100%'
                flexDirection='column' 
                alignContent='flex-start' 
                alignItems='center'>
                {renderCards()}
            </Box>
        </Box>
    );
};

export default ProjectListContainer;