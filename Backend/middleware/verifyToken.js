/**
 * @author Bhautik Koshiya
 */
const jwt = require('jsonwebtoken');

/**
 * This method will check authentucity of jwtToken
 * @param req 
 * @param res 
 * @param next 
 * @returns rese
 */
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}

