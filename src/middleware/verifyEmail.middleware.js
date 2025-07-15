const userOTP = require ('../model/userOtpVerification.model');
const User = require('../model/userAuth.model');
const { StatusCodes } = require('http-status-codes');

const verifyUserEmail = async (req, res, next) => {

    const {user_Id, otp} = req.body;
// checks if user sent in the request body
    try {
        if(!user_Id || !otp){
            throw NotFoundError({
                message: 'No otp sent to verify',
                from: 'verifyUserEmail()',
                cause: error
            });
        }
// Checks if the user's otp actually exist on the Db to verify.
        const userOtpVerifies = await userOTP.find(user_Id);
        if(!userOtpVerifies){
            throw NotFoundError({
                message: 'Email verified. User already exist',
                from: 'verifyUserEmail()',
                cause: error
            });
// If the otp actually exist check if its expired
        }else{
            const { expiresAT } = userOtpVerifies;
            const hashedOTP = userOtpVerifies.user_OTP;

// if yes, delete the record from the db
            if (expiresAT < Date.now()){
                await userOtpVerifies.findByIdAndDelete({user_Id});
                    throw BadRequestError({
                    message: 'Otp code has expired',
                    from: 'verifyUserEmail()',
                    cause: error
                });
//If otp is not expired, compare it with the hashed otp stored in the DB
            } else{
                const compareOtp = bcrypt.compare(otp, hashedOTP);
                if(!compareOtp){
                    throw BadRequestError({
                        message: 'Incorrect otp code sent. Check your inbox',
                        from: 'verifyUserEmail()',
                        cause: error
                    });
// If the otp is the same, update the user table with isVerified: true.
                }else{
                    await User.updateOne({_id: user_Id}, {isVerified: true});
                    await userOtpVerifies.findByIdAndDelete({user_Id});
                    res.status(StatusCodes.OK).json({
                        status: true,
                        message: 'Email verified successfully'
                    });
                }
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {verifyUserEmail}