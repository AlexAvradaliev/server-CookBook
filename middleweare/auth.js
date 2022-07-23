const { verifyToken } = require('../services/userService');

module.exports = () => (req, res, next) => {
    
    try {
        const token = req.headers['x-authorization'];
        if (token) {
            const userData = verifyToken(token);
            req.users = userData;
        };
        next();

    } catch (err) {
        
        res.status(401).json({ token: 'Invalid access token. Please sign in!' });
    };
};

