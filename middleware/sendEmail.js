require('dotenv').config();
const nodemailer = require('nodemailer');

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

const verifyAccount = async (req, res, next) => {
    const user = req.user;
    const userName = user.firstname;
    const userEmail = user.email;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: userEmail,
        subject: 'Account Verification',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Welcome to My App 🎉</h2>
        <p>Hey ${userName},</p>
        <p>Thanks for signing up! We're excited to have you on board.</p>
        <p style="margin-top: 20px;">Cheers,<br>The My App Team</p>
        </div>`
    }

    // Send the email
    transporter.sendMail(mailOptions, (err, info) =>{
        if (err) 
            return console.error('Error:', err);
        console.log('Email sent:', info.response); 
    });

};

module.exports = {verifyAccount};
