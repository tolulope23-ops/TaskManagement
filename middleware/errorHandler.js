const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddlware = async (err, req, res, next) => {
    console.log(err);
    
    let errors = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'something went wrong, try again laters'
    };

    if (err.name === "TokenExpiredError") {
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "please sign in again - token expired";
    };

    if(err.name === "JsonWebTokenError"){
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "invalid token";
    };

    if (err.name === "CastError") {
        errors.message = `No item found with id: ${err.value}`;
        errors.statusCode = StatusCodes.NOT_FOUND;
    };

    if (err.code && err.code === 11000) {
        errors.statusCode = StatusCodes.CONFLICT;
        errors.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
    };

    const {message, statusCode, ...error} = errors;

    return res.status(statusCode).json({
        statusCode,
        message,
        ...error,
      });
}


module.exports = {errorHandlerMiddlware};