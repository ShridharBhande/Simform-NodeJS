let apiHandler = require('../services/api-handler'),
    jWT = require('../helpers/jwt'),
    Promise = require('bluebird'),
    model = require('../models/index'),
    validate = require('../helpers/validation'),
    util = require('../utils/helper');

/**
 * @api {post} /users/register user save API
 *
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} firstName First Name of the specific User
 * @apiParam {String} lastName Last Name of the specific User
 * @apiParam {String} email Email of the specific User
 * @apiParam {String} profileImage Phone Number of the specific User
 * @apiParam {String} password Password of the specific User
 */
exports.register = (req, res) => {
        const {
            body: {
                firstName,
                lastName,
                profileImage,
                email,
                password
            }
        } = req;

        let newUser,
            createUser = {};

    if (!firstName || validate.isEmptyOrNull(firstName) || !lastName || validate.isEmptyOrNull(lastName) || !email || validate.isEmptyOrNull(email)) {
        apiHandler.sendErrorResponse(null, 'REGISTRATION_FIELDS_MISSING', res);
    } else if (validate.isEmail(email)) {
        apiHandler.sendErrorResponse(null, 'INVALID_EMAIL_ADDRESS', res);
    } else {
        createUser.firstName = util.toTitleCase(firstName);
        createUser.lastName = util.toTitleCase(lastName);
        createUser.email = email;
        createUser.password = password;
        createUser.profileImage = profileImage;

       // To check user already present or not
        model.users.getEmail(email, (err, emailData) => {
            if (!err && emailData) {
                apiHandler.sendErrorResponse(null, 'EMAIL_ALREADY_EXIST', res);
            } else {
                newUser = new model.users(createUser);
                // To create new user
                model.users.createUser(newUser, (err, user) => {
                    if (err) {
                        if (err.code === 11000) {
                            apiHandler.sendErrorResponse(null, 'EMAIL_ALREADY_EXIST', res);
                        } else {
                            apiHandler.sendErrorResponse(null, 'UNKNOWN_ERROR', res);
                        }
                    } else {                               
                        // To send success message to to user 
                        user.password = null;
                        apiHandler.sendSuccessResponse(user, res);
                    }
                });
            }
        });
    }
};

/**
 * @api {post} /users/login user login API
 *
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username User Name of the specific User
 * @apiParam {String} password Password of the specific User
 */
exports.login = (req, res) => {
        const {
            body: {
                email,
                password
            }
        } = req;

        let  userData = {};
        let jwtToken;

    if (validate.isEmptyOrNull(email) || validate.isEmail(email)) {
        apiHandler.sendErrorResponse(null, 'INVALID_EMAIL_ADDRESS', res);
    } else if (validate.isEmptyOrNull(password)) {
        apiHandler.sendErrorResponse(null, 'EMPTY_PASSWORD', res);
    } else {
        model.users.getEmail(email, (err, user) => {
            if (err && !user) {
                apiHandler.sendErrorResponse(null, 'FETCHING_ISSUE', res);
            } else if (!user) {
                apiHandler.sendErrorResponse(null, 'INVALID_USER', res);
            } else {
                // Check if given password is correct
                model.users.comparePassword(password, user.password, async(err, isMatch) => {
                    if (err) {
                        apiHandler.sendErrorResponse(null, 'PASSWORD_DOES_NOT_MATCH', res);
                    } else {
                        if (isMatch) {                            
                            userData.id = user._id;
                            userData.firstName = user.firstName;
                            userData.lastName = user.lastName;
                            userData.email = email;
                            userData.date = Date.now();
                            userData.exp = Date.now() + util.getTokenTime();
                            jwtToken = jWT.getLoginToken(userData);
                            user.password = null;
            
                            // send success response 
                            apiHandler.sendSuccessResponse({ token: jwtToken, user: user }, res);
                        } else {
                            apiHandler.sendErrorResponse(null, 'PASSWORD_DOES_NOT_MATCH', res);
                        }
                    }
                });
            }
        });
    }
};


/**
 * @api {get} /users/getuser user Fetch API
 *
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} Token based on token get the specific User Details
 */
 exports.getuser = (req, res) => {
    let {
        user: {
            id
        }
    } = req;

    if (validate.isEmptyOrNull(id)) {
        apiHandler.sendErrorResponse(null, 'INVALID_USER', res);
    } else {
        model.users.getUserById(id, (err, user) => {
            if (err && !user) {
                apiHandler.sendErrorResponse(null, 'FETCHING_ISSUE', res);
            } else if (!user) {
                apiHandler.sendErrorResponse(null, 'INVALID_USER', res);
            } else {
                user.password = null;
                apiHandler.sendSuccessResponse({ user: user }, res);       
            }
        });
    }
};


/**
 * @api {post} /users/edituser user Update API
 *
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} firstName First Name of the specific User
 * @apiParam {String} lastName Last Name of the specific User
 * @apiParam {String} email Email of the specific User
 * @apiParam {String} profileImage Phone Number of the specific User
 * @apiParam {String} password Password of the specific User
 */
 exports.edituser = (req, res) => {
    let {
        body: {
            firstName,
            lastName,
            email
        }
    } = req;

    if (!firstName || validate.isEmptyOrNull(firstName) || !lastName || validate.isEmptyOrNull(lastName) || !email || validate.isEmptyOrNull(email)) {
        apiHandler.sendErrorResponse(null, 'BAD_REQUESTD', res);
    } else {
        // To add logic to check new email id already take by someone or already present         
        model.users.getEmail(email, (err, userDetials) => {
            if (err && !userDetials) {
                apiHandler.sendErrorResponse(null, 'FETCHING_ISSUE', res);
            } else if (userDetials && userDetials._id.toString() != req.user.id) {
                // Email ID already exist
                apiHandler.sendErrorResponse(null, 'USER_ALREADY_EXIST', res);
            } else {

                // Add logic to find update user data based on user ID
                model.users.edituser(req.user.id, req.body, (err, user) => {
                    if (err && !user) {
                        apiHandler.sendErrorResponse(null, 'STORING_DATA', res);
                    } else if (!user) {
                        apiHandler.sendErrorResponse(null, 'INVALID_USER', res);
                    } else {
                        user.password = null;
                        apiHandler.sendSuccessResponse({ user: 'User updated successfully' }, res);       
                    }
                });
            }
        });
    }
};
