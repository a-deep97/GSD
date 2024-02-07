import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import TaskCard from '../view_containers/task-card';

const TasksResult = ({tasks}) => {
    
    
    return (
        <Grid container spacing={2} minWidth='350px' maxWidth='450px' marginRight='20px'>
            {tasks && tasks.map((task, index) => (
                <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TaskCard taskId={task.taskId} task={task} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TasksResult;