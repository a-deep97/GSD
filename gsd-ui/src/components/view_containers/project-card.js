import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography,MenuItem, Box, FormControl,InputLabel,Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ProjectView from './project-view';
import StatusDropdown from '../utilities/status-dropdown';
import CustomDatePicker from '../utilities/date-picker';
import DateType from '../../constants/date-type';
import StatusColorCode from '../../constants/status-color';
import Status from '../../constants/status';

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

const ProjectCard = ({projectId,project}) => {

    const [openProjectView, setOpenProjectView] = useState(false);
    const [projectStatus,setProjectStatus] = useState();
    const [startDate,setStartDate] = useState();
    const [targetDate,setTargetDate] = useState();

    useEffect(()=>{
        setProjectStatus(project.status)
        setStartDate(project.start)
        setTargetDate(project.target)   
    })
    const handleClick = () =>{
        setOpenProjectView(true);
    }
    const onProjectClose = () =>{
        setOpenProjectView(false);
    }
    const handleStatusDropdown = (currentStatus) =>{
        setProjectStatus(currentStatus)
        updateProjectDetails({
            'status': currentStatus
        })
        window.location.reload()
    }
    const handleTargetDateChange = (date) => {
        setTargetDate(date);
        updateProjectDetails({
            'start': date
        })
    }
    const handleStartDateChange = (date) =>{
        setStartDate(date)
        updateProjectDetails({
            'target': date
        })
    }
    const updateProjectDetails = (data) =>{
        const url = `http://localhost:5000/project/${projectId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    return (
        <Box sx={{width:'100%'}}>
            <Card 
                style={{'margin':'5px', width: '95%', height:'170px'}} 
                variant="outlined" 
                onClick={handleClick}
            >
                <CardContent>
                    <Box display='flex' flexDirection='row' alignItems='center' alignContent='flex-start'>
                        <Typography marginLeft='5px' color="textSecondary">
                            {projectId}
                        </Typography>
                        <Typography marginLeft='10px' variant="subtitle" color='primary'
                            sx={{ overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                            }}
                        >
                            {project && project.title}
                        </Typography>
                    </Box>
                    <Box display='flex' 
                        flexDirection='row' 
                        alignContent='flex-start' 
                        alignItems='center'
                    >
                        <Typography variant="body2" component="p" width='50%'
                            sx={{ overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' 
                        }}
                        >
                            {project && project.project}
                        </Typography>
                        <StatusDropdown status={projectStatus} handleStatusDropdown={handleStatusDropdown}/>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                        <CustomDatePicker Date={startDate} handleDateChange={handleTargetDateChange} dateType={DateType.START}/>
                        <CustomDatePicker Date={targetDate} handleDateChange={handleStartDateChange} dateType={DateType.TARGET}/>
                    </Box>
                    <Box style={{
                        height: '100px',
                        textOverflow: 'ellipsis',
                        }}
                        marginTop={2}
                    >
                        <Typography variant='caption'>
                            {project && project.description}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {
                openProjectView ?
                <ProjectView open={openProjectView} onClose={onProjectClose} projectId={projectId} project={project}/> :
                null
            }
        </Box>
    );
};

export default ProjectCard;
