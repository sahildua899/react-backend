const {loginUser,addNewUser, forgotPass,updatePassword,authenticateUser,deleteUser, verifyCookie} = require('../../models/users.model')


// Login User
async function httpLoginUser(req,res){
    const User = await loginUser(req.body);
    res.status(User.statusCode).json(User)
}

// Creating User
async function httpAddNewUser (req,res) {
    const User = await addNewUser(req.body)
    res.status(User.statusCode).json(User)
}

// Forgot Password
async function httpForgotPassword(req,res){
    const User = await forgotPass(req.body.email);
    res.status(User.statusCode).json(User)
}

// Update User Password
async function httpSetNewPassword(req,res){
    const User = await updatePassword(req.body);
    res.status(User.statusCode).json(User)
}

// Authenticate User

async function httpauthenticateUser(req,res) {
    console.log(req.body)
    const User = await authenticateUser(req.body.token);
    res.status(User.statusCode).json(User)
}

// Delete User
async function httpDeleteUser(req,res) {
    const User = await deleteUser(req.body);
    res.status(User.statusCode).json(User)
}

// Veridy Cookie

async function httpVerfiyCookie(req,res) {
    const User = await verifyCookie(req.body);
    res.status(User.statusCode).json(User)
}


module.exports = {httpLoginUser, httpAddNewUser, httpForgotPassword, httpSetNewPassword,httpauthenticateUser, httpDeleteUser,httpVerfiyCookie}