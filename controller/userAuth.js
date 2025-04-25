const {StatusCodes} = require('http-status-codes');
const User = require('../model/userAuth');


const userRegister = async (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;

    try {
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'User already exist'
            });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: 'New user registered',
            data: {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        });

        req.user = newUser;
        next();
        
    } catch (error) {
        next(error);
    }
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

    } catch (error) {
        next(error);
    }
};

const deleteUserAccount = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'User not found!',
                data: {}
            });
        }

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user deleted!'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {userRegister, userLogin, deleteUserAccount};