const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../DB/models/user');


router.post('/auth/signup', async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/user/:id', async (req, res) => {
    const {username, firstname, lastname } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(username){
            user.username = username;
        }
        if(firstname){
            user.firstname = firstname;
        }
        if(lastname){
            user.lastname = lastname;
        }
        await user.save();

        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('auth/logout', (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Logout successful' });
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
