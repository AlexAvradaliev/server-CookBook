const { verifyToken } = require('../services/userService');

module.exports = () => (req, res, next) => {
    
    const token = req.headers['x-authorization'];
    try {
        if (token) {
            const userData = verifyToken(token);
            req.users = userData;
        }
        next();

    } catch (err) {
        
        res.status(401).json({ message: 'Invalid access token. Please sign in!' });
    }
};

