import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
    const dummyProject = {
        title: 'Project Title',
        taskNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        owner: 'Owner Name',
      };
  return (
    <Card style={{'margin':'5px'}} className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {dummyProject.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Project Number: {dummyProject.taskNumber}
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
  );
};

export default ProjectCard;
