const {StatusCodes} = require('http-status-codes');
const UserProfile = require('../model/userProfile');

const UserInfo = async (req, res, next) => {
    try {
        const profile = await UserProfile.find();
        if(profile.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'No user profiles found',
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'User profiles retrieved successfully',
            data: profile
        });

    } catch (error) {
        next(error);
    }

};

const UserInfoById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const profile = await UserProfile.findById(id).populate('user_Id');
        if(!profile){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'User not found',
            });
        };
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'User profile retrieved successfully',
            data: profile
        });

    } catch (error) {
       next(error);
    }
};

const addUserProfile = async(req, res, next) => {
    try {
        const addProfile = new UserProfile(req.body);
        await addProfile.save();
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: 'User profile created successfully',
        });

    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async(req, res, next) => {
    const { id } = req.params;

    try {
        const updateProfile = await UserProfile.findByIdAndUpdate(id, req.body, {new: true});
        if (!updateProfile){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'User not found',
                data: {}
            });
        }

        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'User profile updated successfully',
            data: updateProfile
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {addUserProfile, UserInfo, UserInfoById, updateUserProfile};