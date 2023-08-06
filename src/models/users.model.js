const Users = require("./users.mongo");
const bcrypt = require('bcryptjs');
const { sendVerificationMail, sendForgotPasswordMail } = require("../mailer/mail");
const { findUserByEmail, findUserById, findUserByPhone } = require("../utils/findUser");
const { generateToken, verifyToken, generateTokenforLogin } = require("../utils/jwt");
const { hashPass } = require("../utils/hash");



// Login User
async function loginUser(loginData) {
    // Finding User
    const findUser = await findUserByEmail(loginData.email);
    if(!findUser) return {statusCode:404, message:'Email Address Not Registered'}
    // Checking Is User Verified
    if(findUser.isVerified === false) return {statusCode:400, message:'Please Verify Your Email First'}
    // Verifying Password
    const isMatch = await bcrypt.compare(loginData.password, findUser.password)
    if(!isMatch) return {statusCode:400, message:'Wrong Credentials'}
    const token = await generateTokenforLogin(findUser.email, findUser.phone, findUser.customerType)
    return {statusCode:200, message:`Login Success Welcome ${findUser.firstname} ${findUser.lastname}`, token}
}



// Adding New User
async function addNewUser(userData) {
    // Finding User By Mail
    const findUser = await findUserByEmail(userData.email);
   
    if(findUser) return {statusCode:404, message:'Email Address Already Registered'}
    // Finding User By Phone Number
    const phoneUser = await findUserByPhone(userData.phone);
    if(phoneUser) return {statusCode:404, message:'Phone Number Already Registered'}
    // Adding User
    const token = await generateToken(userData.email, userData.phone);
    userData.token = token
    const sendMail = await sendVerificationMail(token, userData.email, userData.firstname);
    const newUser = new Users(userData).save();
    return {statusCode:201, message:'User Created'}
}



// Forgot Password
async function forgotPass(email){
    // Finding User By Email
    const findUser = await findUserByEmail(email);
    if(!findUser) return {statusCode:400, message:'Email Not Registered'}
    const token = await generateToken(findUser.email, findUser.phone, findUser.customerType);
    const sendMail = await sendForgotPasswordMail(token, email, findUser.firstname);
    return {statusCode:200, message:`We Just Sent You Reset Mail at ${email}`}
}



// Update User Password
async function updatePassword(userData) {
    if(!userData.token) return {statusCode:400, message:'No Valid Token Found'};
    // Token verification
    const verify = await verifyToken(userData.token)
    if(!verify) return {statusCode:400, message:'No Valid Token Found'};
    // Find User By Mail
    const findUser = await findUserByEmail(verify.email);
    const newPass = await hashPass(userData.password);
    // Updating New Pass in database
    const updatedPass = await Users.updateOne({email:findUser.email}, {password:newPass})
    return {statusCode:200, message:'Password Updated'}
}


// Authenticate User
async function authenticateUser(token){
    if(!token) return {statusCode:400, message:'No Valid Token Found'};
    const verify = await verifyToken(token);
    if(!verify) return {statusCode:400, message:'No Valid Token Found'};
    // Finding user
    const findUser = await findUserByEmail(verify.email);
    if(!findUser) return {statusCode:400, message:'No User Found'}
    // Updating isVerified in Database
    if(findUser.isVerified === true) return {statusCode:400, message:'This User is Already Verified'}
    const updatedUser = await Users.updateOne({email:findUser.email}, {isVerified:true})
    return {statusCode:200, message:'User Verified'}
}


//Delete User
async function deleteUser(userData) {   
    // Email and Id User finding
    if(userData.id) {
        const findUser = await findUserById(userData.id)
        if(!findUser) return {statusCode:404, message:'User Not Found'}
        const deletedUser = await Users.deleteOne({_id:findUser._id})
        return {statusCode:200, message:'User Deleted'}
    }
    const findUser = await findUserByEmail(userData.email);
    if(!findUser) return {statusCode:404, message:'User Not Found'}
    const deletedUser = await Users.deleteOne({email:findUser.email})
    return {statusCode:200, message:'User Deleted'}
}


// Verify Cookie 

async function verifyCookie(data) {
    // Verifying Cookie
    const verify = await verifyToken(data.cookie);
    if(!verify) return {statusCode:400, message:'Not a Valid Token'}
    if(verify.customerType === 'Customer') {
        return {statusCode:200, onecheck:'check'}
    }else if (verify.customerType === 'Admin') {
        return {statusCode:200, onecheck:'/a/'}
    }
    
}

module.exports = {loginUser,addNewUser,updatePassword,forgotPass,authenticateUser, deleteUser, verifyCookie}