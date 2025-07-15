const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../error/error.error');

const errorHandlerMiddlware = async (error, req, res, next) => {
    console.log(error);
    
    let errors = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'something went wrong, try again laters'
    };

    if (error instanceof BaseError) {
        res.status(error.statusCode).json(error.toJSON());
    }

    if (error.name === "TokenExpiredError") {
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "please sign in again - token expired";
    };

    if(error.name === "JsonWebTokenError"){
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "invalid token";
    };

    if (error.name === "CastError") {
        errors.message = `No item found with id: ${error.value}`;
        errors.statusCode = StatusCodes.NOT_FOUND;
    };

    if (error.code && error.code === 11000) {
        errors.statusCode = StatusCodes.CONFLICT;
        errors.message = `Duplicate value entered for ${Object.keys(error.keyValue)} field`;
    };

    const {message, statusCode, ...err} = errors;

    return res.status(statusCode).json({
        statusCode,
        message,
        ...err,
      });
}


module.exports = {errorHandlerMiddlware};