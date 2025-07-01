require('dotenv').config();
const nodemailer = require('nodemailer');
const {verifyEmailHtml} = require('./emailTemplate');
const generateOTP = require('../utils/sendOTP');
const { StatusCodes } = require('http-status-codes');

//Email configuration
const transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    host: process.env.HOST,
    secure: false,
    auth:{
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
});

// Sends otp for email verification
const sendVerification = async (req, res, next) => {
try{
  const OTP = await generateOTP();
  console.log(OTP);

  const user = req.userData;
  const userEmail = user.email;
  const username = user.firstname;

  const mail = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    html: verifyEmailHtml(username, OTP)
  });
  
  if (mail.accepted.includes(userEmail)) {
        console.log('Verification Email sent successfully to', userEmail);
      } else {
        console.log('Email not accepted by SMTP server');
      }  
  } catch (error) {
      console.error('Error sending verification email:', error.message);
    }
};

module.exports = { sendVerification};