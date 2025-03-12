const {StatusCodes} = require('http-status-codes');
const User = require('../model/user');


const userRegister = async (req, res) =>{
    const {firstname, lastname, email, password} = req.body;

    try {
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'user already exist'
            })
        }

        const user = new User(req.body);
        await user.save();
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: 'new user registered',
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
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

        res.status(StatusCodes.OK).json({
            status:StatusCodes.OK,
            message:'user loggedin',
            data: {
                email: user.email
            }
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error loggingin: ${error}`,
        })
    }
}


module.exports = {userRegister, userLogin};