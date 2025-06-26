import bcrypt from 'bcrypt';

const generateOTP = async () => {
   const OTP = Math.floor(100000 + Math.random() * 900000).toString();
   const hashedOTP = await bcrypt.hash(OTP, 10);
   return hashedOTP;
}

module.exports = generateOTP;