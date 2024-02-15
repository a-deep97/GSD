const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../DB/models/user');
const { JWT_COOKIE_KEY, JWT_SECRET } = process.env;

router.post('/auth/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({ firstname, lastname, email, password: hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        //Need to figure out why this is not working
        //res.cookie('gsd_token', token,{maxAge:36000000, httpOnly: true});
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
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


router.post('/auth/logout', (req, res) => {

    try{
        console.log('blacklist jwt with redis: TODO');
        res.status(200).json({message:'Logout Successful'});
    }catch(error){
        console.error('Error logging out',error);
        res.status(500).json({message: 'Internal server Error'})
    }
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
