import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';

import TaskListContainer from './task-list-container';
import Status from '../../constants/status';
import {jwtToken} from '../../lib/jwt';

const TasksContainer = () => {

    const navigate = useNavigate();
    const [noneTasks,setNoneTasks] = useState([]);
    const [inProgressTasks,setInProgressTasks] = useState([]);
    const [plannedTasks,setPlannedTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    const [backlogTasks,setBacklogTasks] = useState([]);    
    useEffect(()=>{
        const fetchTasks = () =>{
            fetch('http://localhost:5000/tasks',{
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwtToken()
                },
                credentials: 'include',
            })
                .then(response => {
                    if(response.status==403){
                        navigate('/auth')
                    }
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    let none = [];
                    let inProgress = [];
                    let planned = [];
                    let completed = [];
                    let backlog = [];

                    // Iterate through the fetched tasks and populate corresponding arrays
                    data.forEach(task => {
                        switch (task.status) {
                            case Status.None:
                                none.push(task);
                                break;
                            case Status.Progress:
                                inProgress.push(task);
                                break;
                            case Status.Planned:
                                planned.push(task);
                                break;
                            case Status.Completed:
                                completed.push(task);
                                break;
                            case Status.Backlog:
                                backlog.push(task);
                                break;
                            default:
                                break;
                        }
                    });

                    setNoneTasks(none);
                    setInProgressTasks(inProgress);
                    setPlannedTasks(planned);
                    setCompletedTasks(completed);
                    setBacklogTasks(backlog);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

        }
        fetchTasks()
    },[]);
    return (
        <Box alignSelf='center' 
            display='flex' 
            flexDirection='row' 
            alignContent='center' 
            alignItems='flex-start' 
            width={'97%'}
            marginTop={3}
        >
            <TaskListContainer tasks={noneTasks} status={Status.None}/>
            <TaskListContainer tasks = {plannedTasks} status={Status.Planned}/>
            <TaskListContainer tasks = {inProgressTasks} status={Status.Progress}/>
            <TaskListContainer tasks = {completedTasks} status={Status.Completed}/>
            <TaskListContainer tasks = {backlogTasks} status={Status.Backlog}/>
        </Box>
    );
};

export default TasksContainer;