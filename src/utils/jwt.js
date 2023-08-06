const jwt = require('jsonwebtoken');

//Generating Jwt Auth Token
async function generateToken(email, phone, customerType) {
    const token = jwt.sign({email,phone,customerType}, process.env.JWT_SECRET, {expiresIn:'2h'})
    return token
}

// Jwt for login
async function generateTokenforLogin(email, phone, customerType) {
    const token = jwt.sign({email,phone,customerType}, process.env.JWT_SECRET)
    return token
}

// Verify Jwt Token
async function verifyToken(token) {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return verify
}

module.exports = {generateToken, verifyToken, generateTokenforLogin}