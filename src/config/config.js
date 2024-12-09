require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    persistence: process.env.PERSISTENCE
}