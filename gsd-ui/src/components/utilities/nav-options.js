import React from 'react';
import { Select,MenuItem,Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import {jwtToken,clearCookie} from '../../lib/jwt';

const NavOptions = () => {

    const navigate = useNavigate();
    const handleSettings = () =>{
        console.log("settings clicked");
    }
    const handleLogout = () =>{
        console.log('logout clicked')
        const token = jwtToken()
        fetch('http://localhost:5000/user/auth/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + jwtToken()
            },
            credentials: 'include',
        })
        .then( response =>{
            if(!response.ok){
                throw Error('Logout failed')
            }
            debugger
            clearCookie()
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
                <MenuItem onClick={handleSettings}>
                    <IconButton size="small" color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <IconButton size="small" color="inherit">
                        <LogoutIcon />
                    </IconButton>
                    Logout
                </MenuItem>
            </Select>
        </Box>
      );
};

export default NavOptions ;