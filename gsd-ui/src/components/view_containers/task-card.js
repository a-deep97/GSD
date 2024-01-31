import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TaskView from './task-view';

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

const TaskCard = () => {
    const classes = useStyles();
    const [openTaskView, setOpenTaskView] = useState(false);
    const dummyTask = {
        title: 'Task Title',
        taskNumber: 'T001',
        status: 'In Progress',
        target: '2024-12-31',
        startDate: '2024-01-01',
        project: 'Project Name',
        owner: 'Owner Name',
      };
    const handleClick = () =>{
        setOpenTaskView(true);
    }
    const onTaskClose = () =>{
        debugger
        setOpenTaskView(false);
    }
    return (
        <Box>
            <Card style={{'margin':'5px'}} className={classes.root} variant="outlined" onClick={handleClick}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {dummyTask.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Task Number: {dummyTask.taskNumber}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Task Status: {dummyTask.status}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Target: {dummyTask.target}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Start Date: {dummyTask.startDate}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Project: {dummyTask.project}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Owner: {dummyTask.owner}
                    </Typography>
                </CardContent>
            </Card>
            {
                openTaskView ?
                <TaskView open={openTaskView} onClose={onTaskClose} task={dummyTask}/> :
                null
            }
        </Box>
    );
};

export default TaskCard;
