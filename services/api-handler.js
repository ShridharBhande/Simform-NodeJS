const ErrorCode = require(`../stringContants/errorCodes`);
const ErrorConstant = require(`../stringContants/errorMessages`);

module.exports = {
    sendErrorResponse: (serverError, error, res) => {
        if (serverError) {
            // Set error message 
            console.log('--### Server Error --->', error)
        } else {
            // Set error message 
            console.log('--### Server Error --->', error)
        }

        let httpCode = ErrorCode["BAD_REQUEST"];
        if (error === "INVALID_TOKEN" || error === "NO_TOKEN") {
            httpCode = ErrorCode["UNAUTHORIZED"]
        }
        const response = {
            isError: true,
            error: {
                code: ErrorCode[error],
                message: ErrorConstant[error]
            }
        };
        return res.status(ErrorCode["BAD_REQUEST"]).send(response);
    },
    sendSuccessResponse: (data, res) => {
        const response = {
            isError: false,
            data: data
        };
        return res.status(ErrorCode["HTTP_SUCCESS"]).send(response);
    }
};