require('dotenv').config();
const nodemailer = require('nodemailer');
const {verifyEmailHtml} = require('./emailTemplate');
const {generateOTP} = require('./sendOTP');

const OTP_DB = {}
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
const sendVerification = async (req, res) => {
  const user = req.userData;
  const userId = user._id;
  const userEmail = user.email;
  const username = user.firstname;

try{
// Stores otp per user id
  const OTP = await generateOTP();
  OTP_DB[userId] = {
      OTP,
      expiresAt: Date.now() + 10 * 60 * 1000
  };

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

module.exports = { sendVerification, OTP_DB};