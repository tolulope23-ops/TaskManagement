const {StatusCodes} = require('http-status-codes');
const User = require('../model/userAuth.model');

const userRegister = async (req, res, next) => {    
    const {firstname, email} = req.body;
    
    try {
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: 'User already exist'
            });
        };

        const newUser = new User(req.body);
        await newUser.save();
        res.status(StatusCodes.CREATED).json({
            status: "success",
            message: 'New user registered',
            data: {
                firstname: firstname,
                email: email
            }
        });

        req.userData = newUser;
        next();

    } catch (error) {
        next(error);
    };
};


const userLogin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:'User does not exist'
            });
        };
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:'Password is incorrect'
            });
        }

            const accessToken = await user.createJWT();
            const updateUser = await User.findByIdAndUpdate({_id: user._id, accessToken, new: true });
            
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "Login successful",
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                    },
                  accessToken,
                },
            });
    } 
    catch (error) {
        next(error);
    }
};



module.exports = {userRegister, userLogin};