

import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Box } from "@mui/material";

function TopNavbar(){

    const navigate = useNavigate()
    const handleTasksLink = () => {
        navigate('/tasks')
    }
    const handleDashboardLink = () => {
        navigate('/dashboard')
    }
    const handleProjectsLink = () => {
        navigate('/projects')
    }
    const handleSearchLink = () => {
        navigate('/search')
    }
    return (
        <AppBar position="relative" style={{'background':'black'}} >
            <Toolbar>
                <Button variant='text' size='large' style={{'color':'white'}} onClick={() =>handleTasksLink()}>Tasks</Button>
                <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleProjectsLink()}>Projects</Button>
                <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleDashboardLink()}>Dashboard</Button>
                <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleSearchLink()}>Search</Button>
            </Toolbar>
        </AppBar>
    );
}


export default TopNavbar;