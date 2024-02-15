import React from 'react';
import { Select,MenuItem,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavOptions = () => {

    const navigate = useNavigate();
    const handleSettings = () =>{
        console.log("settings clicked");
    }
    const handleLogout = () =>{
        fetch('http://localhost:5000/user/auth/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then( response =>{
            if(!response.ok){
                throw Error('Logout failed')
            }
            navigate('/auth');
        })
        .catch(error=>{
            console.error('Logout failed')
        });
    }
    return (
        <Box sx={{
            height: '50px',
            width: '50px'
        }}>
            <Select
                sx={{
                    width:'100%',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '50%'
                }}
                inputProps={{ 'aria-label': 'Select an option' }}
                >
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Select>
        </Box>
      );
};

export default NavOptions ;