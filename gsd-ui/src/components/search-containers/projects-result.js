import React from 'react';
import { Grid } from '@mui/material';

import ProjectCard from '../view_containers/project-card';

const ProjectsResult = ({projects}) => {
    return (
        <Grid container spacing={2}>
            {projects.map((project, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <ProjectCard projectId={project.projectId} data={project} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectsResult;