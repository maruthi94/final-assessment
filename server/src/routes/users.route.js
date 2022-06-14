const express = require('express');
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/create', async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
        return res.status(400).json({ error: 'One or more mandatory fields missing' });
    }
    try {
        const user = { lastName, firstName, email, password };
        await userService.save(user);
        res.status(201).json({ lastName, firstName, email });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userService.findByEmail(email);
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const secret = process.env.JWT_SECRET_KEY;
                const { password, ...userWithoutPassword } = user;
                const token = jwt.sign(userWithoutPassword, secret, { expiresIn: '6h' });
                res.json({ token });
            } else {
                res.status(403).json({ error: 'Incorrect password' });
            }
        } else {
            res.status(400).json({ error: `User does not exist` });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
