const {StatusCodes} = require('http-status-codes');
const UserProfile = require('../model/userProfile');

const UserInfo = async (req, res) => {
    try {
        const profile = await UserProfile.find();
        if(profile.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({
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
            message: `no user(s) profile: ${error}`
        });
    }
    
}


const UserInfoById = async (req, res) =>{
    const { id } = req.params;

    try {
        const profile = await UserProfile.findById({_id: id}).populate('user_Id');
        if(!profile){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'user not found',
            });
        };
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user profile',
            data: profile
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `user not found: ${error}`
        });
    }
}

const addUserProfile = async(req, res) => {
    try {
        const addProfile = new UserProfile(req.body);
        await addProfile.save();
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: 'user profile created',
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error creating profile: ${error}`
        });
    }
}

const updateUserProfile = async(req, res) =>{
    const { id } = req.params;

    try {
        const updateProfile = await UserProfile.findByIdAndUpdate({_id: id}, (req.body), {new: true});
        if (!updateProfile){
            res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'user not found!',
                data: {}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user profile updated!',
            data: updateProfile
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `error updating profile: ${error}`
        });
    }
}

module.exports = {addUserProfile, UserInfo, UserInfoById, updateUserProfile};