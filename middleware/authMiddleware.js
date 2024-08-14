export const authenticateModerator = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing authorization header' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // Default credentials
    const defaultEmail = 'admin@admin.com';
    const defaultPassword = 'admin123';

    if (email === defaultEmail && password === defaultPassword) {
        next();
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};