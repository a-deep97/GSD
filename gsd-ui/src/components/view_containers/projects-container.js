import React, { useEffect, useState } from 'react';
import {Box} from '@mui/material';

import ProjectListContainer from './project-list-container';
import Status from '../../constants/status';

import { jwtToken } from '../../lib/jwt';
import { useNavigate } from 'react-router-dom';

const ProjectsContainer = () => {

    const navigate = useNavigate();
    const [noneProjects,setNoneProjects] = useState([]);
    const [inProgressProjects,setInProgressProjects] = useState([]);
    const [plannedProjects,setPlannedProjects] = useState([]);
    const [completedProjects,setCompletedProjects] = useState([]);
    const [backlogProjects,setBacklogProjects] = useState([]);    
    useEffect(()=>{
        const fetchProjects = () =>{
            fetch('http://localhost:5000/projects',{
                    method: 'GET',
                    headers: {
                        'Authorization' : 'Bearer ' + jwtToken()
                    },
                    credentials: 'include',
                })
                .then(response => {
                    debugger
                    if (response.status == 403){
                        console.error('Access denied');
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

                    // Iterate through the fetched projects and populate corresponding arrays
                    data.forEach(project => {
                        switch (project.status) {
                            case Status.None:
                                none.push(project);
                                break;
                            case Status.Progress:
                                inProgress.push(project);
                                break;
                            case Status.Planned:
                                planned.push(project);
                                break;
                            case Status.Completed:
                                completed.push(project);
                                break;
                            case Status.Backlog:
                                backlog.push(project);
                                break;
                            default:
                                break;
                        }
                    });

                    setNoneProjects(none);
                    setInProgressProjects(inProgress);
                    setPlannedProjects(planned);
                    setCompletedProjects(completed);
                    setBacklogProjects(backlog);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

        }
        fetchProjects()
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
            <ProjectListContainer projects={noneProjects} status={Status.None}/>
            <ProjectListContainer projects = {plannedProjects} status={Status.Planned}/>
            <ProjectListContainer projects = {inProgressProjects} status={Status.Progress}/>
            <ProjectListContainer projects = {completedProjects} status={Status.Completed}/>
            <ProjectListContainer projects = {backlogProjects} status={Status.Backlog}/>
        </Box>
    );
};

export default ProjectsContainer;