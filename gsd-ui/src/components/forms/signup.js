import React, { useState } from 'react';
import { Typography, TextField, Button ,Box,Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleSubmit = async () =>{
        
        const userData ={
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }
        fetch('http://localhost:5000/user/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData.message);
            const { token } = responseData;

            // Storing JWT token in cookie
            document.cookie = `token=${token}; path=/; HttpOnly`;
            console.log('Login successful');

            // Redirect to another page or perform additional actions
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
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
                <TextField
                    label="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                    size = 'small'
                    fullWidth
                    required
                />
                <TextField
                    label="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                    size = 'small'
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    size = 'small'
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    size = 'small'
                    fullWidth
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    size = 'small'
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign Up
                </Button>
                <Typography variant="body2" align="center" style={{ marginTop: 20 }}>
                    Already have an account? <Link href="/auth">Log in</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Signup;