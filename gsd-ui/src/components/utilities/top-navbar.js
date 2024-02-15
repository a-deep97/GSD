

import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Box } from "@mui/material";

import NavOptions from "./nav-options";

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
        <Box
            sx={{
            display:'flex',
            flexDirection: 'row',
            height: '80px',
            width: '100%'
        }}>
            <AppBar 
                position="relative"
                display= 'flex'
                flexDirection = 'row' 
                sx={{
                    background: 'black',
                    height: '100%',
                    width: '100%'
                }}>
                <Toolbar sx={{
                    height: '100%',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Button variant='text' size='large' style={{'color':'white'}} onClick={() =>handleTasksLink()}>Tasks</Button>
                        <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleProjectsLink()}>Projects</Button>
                        <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleDashboardLink()}>Dashboard</Button>
                        <Button variant='text' size='large' style={{'color':'white'}} onClick={() => handleSearchLink()}>Search</Button>
                    </Box>
                    <NavOptions/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default TopNavbar;