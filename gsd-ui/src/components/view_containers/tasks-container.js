import React, { useEffect, useState } from 'react';
import {Box} from '@mui/material';

import TaskListContainer from './task-list-container';
import Status from '../../constants/status';

const TasksContainer = () => {

    const [noneTasks,setNoneTasks] = useState([]);
    const [inProgressTasks,setInProgressTasks] = useState([]);
    const [plannedTasks,setPlannedTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    const [backlogTasks,setBacklogTasks] = useState([]);    
    useEffect(()=>{
        const fetchTasks = () =>{
            fetch('https://api.example.com/data')
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(task => {
                        if (task.status === Status.None) {
                            setNoneTasks(prevTasks => [...prevTasks, task]);
                        }
                        else if(task.status === Status.Progress) {
                            setInProgressTasks(prevTasks => [...prevTasks, task]);
                        }
                        else if(task.status === Status.Planned) {
                            setPlannedTasks(prevTasks => [...prevTasks, task]);
                        }
                        else if(task.status === Status.Backlog) {
                            setBacklogTasks(prevTasks => [...prevTasks, task]);
                        }
                        else if(task.status === Status.Completed) {
                            setCompletedTasks(prevTasks => [...prevTasks, task]);
                        }
                      });
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

        }
        fetchTasks()
    },[]);
    return (
        <Box alignSelf='center' display='flex' flexDirection='row' alignContent='flex-start' alignItems='center'>
                <TaskListContainer tasks={noneTasks} status={Status.None}/>
                <TaskListContainer tasks = {plannedTasks} status={Status.Planned}/>
                <TaskListContainer tasks = {inProgressTasks} status={Status.Progress}/>
                <TaskListContainer tasks = {completedTasks} status={Status.Completed}/>
                <TaskListContainer tasks = {backlogTasks} status={Status.Backlog}/>
        </Box>
    );
};

export default TasksContainer;