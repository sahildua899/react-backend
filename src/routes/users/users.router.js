const express = require('express');
const {httpLoginUser, httpAddNewUser, httpForgotPassword,httpSetNewPassword,httpauthenticateUser,httpDeleteUser, httpVerfiyCookie} = require('./users.controller')


const usersRouter = express.Router();

usersRouter.post('/login', httpLoginUser)
usersRouter.post('/addNew', httpAddNewUser)
usersRouter.post('/forgot',httpForgotPassword);
usersRouter.post('/newpass',httpSetNewPassword);
usersRouter.post('/authenticate/*', httpauthenticateUser)
usersRouter.delete('/delete', httpDeleteUser)
usersRouter.post('/verifyCookie', httpVerfiyCookie)

module.exports = usersRouter;