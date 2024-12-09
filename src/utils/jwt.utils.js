const jwt = require("jsonwebtoken")
require('dotenv').config()

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

// Middleware
const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send({ error: "Not authenticated" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ erro: "Not authorized" });
        }
        req.user = credentials;
        next();
    });
};

module.exports = {
    generateToken,
    authToken,
};

