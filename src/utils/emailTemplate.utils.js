const verifyEmailHtml = (username, otp) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          color: #333;
        }
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .otp-box {
          font-size: 24px;
          font-weight:bold;
          margin-top: 20px;
          background-color: #e9ecef;
          padding: 10px;
          border-radius: 6px;
          letter-spacing: 4px;
          text-align: center;
          display: inline-block;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification</h2>
        <p>Hi ${username},</p>
        <p>Use the verification code below to complete your registration:</p>
        <div class="otp-box">${otp}</div>
        <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
        <p style="margin-top: 20px;">This code expires in 1 hour.</p>
        <div class="footer">
          &copy; 2025 RaeDev. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;

module.exports = {verifyEmailHtml};