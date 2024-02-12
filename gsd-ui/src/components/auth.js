import React, { useState } from 'react';
import Login from './forms/login';
import { Box } from '@mui/material';

const AuthPage = () => {
    const [signUpTrue,setSignUpTrue] = useState(false);
    const authImage = require('../static/media/auth-img.jpg')
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '1300px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Login/>
                <Box sx={{
                    height: '100%',
                    width: '90%'
                }}>
                    <img src={authImage} alt='auth image' style={{
                        maxHeight: '100%',
                        maxWidth: '100%'
                    }} />
                </Box>
            </Box>
        </Box>
    );
};

export default AuthPage;