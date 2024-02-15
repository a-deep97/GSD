import React, { useState } from 'react';
import { Typography, TextField, Button ,Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const userData ={
            email: email,
            password: password
        }
        fetch('http://localhost:5000/user/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        })
        .then(response => {
            debugger
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData.message);
            const { token } = responseData;

            // Storing JWT token in cookie
            document.cookie = `gsd_user_token=${token}; path=/`;
            console.log('Login successful');
            navigate('/tasks');
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
                <Typography variant="body2" align="center" style={{ marginTop: 20 }}>
                    Don't have an account? <Link href={`/auth/${true}`}> sign up </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;