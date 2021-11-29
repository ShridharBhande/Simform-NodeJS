const JWT = require(`jsonwebtoken`);
const { jwtSecret } = require(`../config/secrets`);
const { sendSuccessResponse, sendErrorResponse } = require(`./api-handler`);
const ERROR = require(`../utils/errorHandler`);
const jWT = require('../helpers/jwt');

const {
    excludedRoutes
} = require(`../config/config`);

module.exports = {
    interceptor: (req, res, next) => {
        const {
            headers: {
                token: authorization
            },
            body: {
                token: bodyToken,
                email
            },
            path
        } = req;
        const token = bodyToken || authorization;

        // Exclude routes go directly to APIs
        if (excludedRoutes.indexOf(path) !== -1) {
            next();
        } else if (!token) {
            let result = {
                status: false,
                message: "No token is provided"
            };
            sendErrorResponse(null, ERROR.NO_TOKEN, res);
        }   else {
            // To check Token is expired or not/authorized user
            JWT.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    sendErrorResponse(err, ERROR.INVALID_TOKEN, res);
                } else {
                    req.user = decoded;
                    req.user.password = null;

                    // Do next processes
                    next();
                }
            });
        }
    }
};
