import React, { useState } from 'react';
import { Typography, TextField, Button ,Box } from '@mui/material';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = () =>{

    }
    return (
        <Box sx={{
            height: '95%',
            width: '400px',
            border: '1px solid rgba(0,0,0,0.5)',
            borderRadius: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;