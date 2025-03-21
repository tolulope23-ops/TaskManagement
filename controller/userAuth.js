const {StatusCodes} = require('http-status-codes');
const User = require('../model/userAuth');


const userRegister = async (req, res) =>{
    const {firstname, lastname, email, password} = req.body;

    try {
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'user already exist'
            })
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: 'new user registered',
            data: {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error registering new user: ${error}`,
        })
    }
}


const userLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:'user does not exist'
            });
        };
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect)
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:'password not correct'
            });

            const accessToken = await user.createJWT();
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "login successful",
                data: {
                    user: {
                    id: user._id,
                    email: user.email,
                  },
                  accessToken,
                },
            });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error loggingin: ${error}`,
        })
    }
}

const deleteUserAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete({_id: id}, {new: true});
        if (!deleteUser){
            res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'user not found!',
                data: {}
            })
        }

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user deleted!'
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error deleting user: ${error}`
        });
    }
}

module.exports = {userRegister, userLogin, deleteUserAccount};