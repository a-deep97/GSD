import React from 'react';
import { Grid } from '@mui/material';
import TaskCard from '../view_containers/task-card';

const TasksResult = ({tasks}) => {
    return (
        <Grid container spacing={2}>
            {tasks.map((task, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <TaskCard taskId={task.taskId} task={task} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TasksResult;