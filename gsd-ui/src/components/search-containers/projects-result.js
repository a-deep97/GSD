import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import ProjectCard from '../view_containers/project-card';

const ProjectsResult = ({projects}) => {
    
    const screenWidth = window.innerWidth;

    return (
        <Grid container spacing={2} minWidth='350px' maxWidth='450px' marginLeft='20px'>
            {projects.map((project, index) => (
                <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ProjectCard projectId={project.projectId} project={project} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectsResult;