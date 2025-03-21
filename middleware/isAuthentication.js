const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const isUserAuthenticated = (req, res, next) => {
    let accessToken;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        accessToken = authHeader.split(" ")[1];
    }

    if(!accessToken){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'please sign In',
            statusCode: StatusCodes.UNAUTHORIZED
        })
    }

    try {
        const payload = jwt.verify(accessToken, JWT_SECRET);
        req.user = {
            id: payload.id,
            email: payload.email,
        }
    next()
    } catch (error) {
        next(error);
    }
}

module.exports = {isUserAuthenticated}

