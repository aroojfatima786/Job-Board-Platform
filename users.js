const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register a user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login (simplified, should include password verification in real apps)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        // Password check would go here
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
