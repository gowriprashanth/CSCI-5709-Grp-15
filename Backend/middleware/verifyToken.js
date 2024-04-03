const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        console.log("insdie ss");

        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("insdie veri",token);

        if (err) {
            console.log("rrr", err);
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        
        req.decoded = decoded;
        next();
    });
}

