const {OTP_DB} = require('../utils/sendverificationEmail');
const verifyUserEmail = async (req, res) => {
    const { code } = req.body;
    
}

module.exports = {verifyUserEmail}