require('dotenv').config();
const nodemailer = require('nodemailer');
const {verifyEmailHtml} = require('../utils/emailTemplate.utils');
const {generateOTP} = require('../utils/sendOTP.utils');
const userOTP = require ('../model/userOtpVerification.model');
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
const sendVerification = async ({_id: userId, email: userEmail}, res) => {

try {
// Stores otp per user id
  const OTP = await generateOTP();

  //Hash otp before storing to DB    
  const hashedOTP = await bcrypt.hash(OTP, genSalt(12));

  const newOTP = await userOTP.create({
    user_Id: userId,
    user_Otp: hashedOTP,
    expiresAT: Date.now() + 360000
  });

  const mail = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    html: verifyEmailHtml(username, OTP)
  });
  
  if (mail.accepted.includes(userEmail)) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Verification otp sent',
        data: userEmail
      });
    }
  } 
  catch (error) {
    next(error);
  }
};

module.exports = { sendVerification};