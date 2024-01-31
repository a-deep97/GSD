import React from 'react';
import { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ProjectView from './project-view';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ProjectCard = () => {
    const classes = useStyles();
    const [openProjectView, setOpenProjectView] = useState(false);
    
    const handleClick = () =>{
        setOpenProjectView(true);
    }
    const onProjectClose = () =>{

        setOpenProjectView(false);
    }
    const dummyProject = {
        title: 'Project Title',
        projectNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        owner: 'Owner Name',
      };
  return (
    <Box>
      <Card style={{'margin':'5px'}} className={classes.root} variant="outlined" onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {dummyProject.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Project Number: {dummyProject.projectNumber}
          </Typography>
          <Typography variant="body2" component="p">
            Project Status: {dummyProject.status}
          </Typography>
          <Typography variant="body2" component="p">
            Target: {dummyProject.target}
          </Typography>
          <Typography variant="body2" component="p">
            Start Date: {dummyProject.startDate}
          </Typography>
          <Typography variant="body2" component="p">
            Owner: {dummyProject.owner}
          </Typography>
        </CardContent>
      </Card>
      {
        openProjectView ?
        <ProjectView open={openProjectView} onClose={onProjectClose} project={dummyProject}/>:
        null
      }
    </Box>
  );
};

export default ProjectCard;
