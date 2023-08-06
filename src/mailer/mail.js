const nodemailer = require('nodemailer');

// Initialising Nodemailer

let mailTransporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'sahildua899@gmail.com',
        pass:'ehigvvdotgmzofzy'
    }
});

//Sending Mail for New User

async function sendVerificationMail(token, email, firstname) {

    let link = `${process.env.FRONTEND_PORT}/authenticate/${token}`;
    let mailDetails = {
        from: 'sahildua899@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Hi ${firstname} Please Verify your Account by clicking on this link ${link} `
    };
    return sendMail(mailDetails)
}


// Sending Forgot Mail

async function sendForgotPasswordMail(token,email,firstname) {
    let link = `${process.env.FRONTEND_PORT}/newPassword/${token}`;
    let mailDetails = {
        from: 'sahildua899@gmail.com',
        to: email,
        subject: 'Reset Your Password',
        text: `Hi ${firstname} Please Reset your Password by clicking on this link ${link} `
    };

    return sendMail(mailDetails)
}



// Final Sending Mail

async function sendMail(mailDetails) {
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            return {statusCode:200, message:'Mail Sent'}
        }
    });
}


module.exports = {sendVerificationMail,sendForgotPasswordMail}