const {StatusCodes} = require('http-status-codes');
const UserProfile = require('../model/userProfile');


const UserInfo = async (req, res) => {
    try {
        const profile = await UserProfile.find();
        if(!profile){
            res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'no user profile',
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user(s) profile',
            data: profile
        });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: error
        });
    }
    
}


const UserInfoById = async (req, res) =>{
    const {id} = req.params;

    try {
        const profile = await UserProfile.findById({_id: id});
        if(!profile){
            res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `user not found`,
            });
        };
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: `user profile`,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: error
        });
    }
}

module.exports = {UserInfo, UserInfoById};