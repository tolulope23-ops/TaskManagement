const {StatusCodes} = require('http-status-codes');
const {userRegisterData, userLoginData} = require('../utils/validation.utils');

const validateUserData = (req, res, next) => {
    //Check if the user is registering or logging in to determin the schema validation type
    const userAction = () => {
        const SchemaType = req.body.firstname || req.body.lastname ? userRegisterData() : userLoginData();
        return SchemaType;
    }
    const { error } = userAction().validate(req.body, {abortEarly: false});
    if(error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.details.map((e) => e.message)
    });
    };
    next();
};


module.exports = {validateUserData};