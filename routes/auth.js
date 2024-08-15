import express from 'express';
import jwt from 'jsonwebtoken';

const route = express.Router();

// Default credentials
const defaultEmail = 'admin@admin.com';
const defaultPassword = 'admin123';
const secretKey = process.env.JWT_SECRET;

route.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === defaultEmail && password === defaultPassword) {
        // Generate a JWT token
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });  // Token expires in 1 hour
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default route;