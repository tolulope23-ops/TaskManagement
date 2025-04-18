require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;