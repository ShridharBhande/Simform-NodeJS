let JWT = require('jsonwebtoken'),
    Bcrypt = require('bcryptjs'),
    jwtSecret = require('../config/secrets').jwtSecret;

module.exports = {

    /**
     * Method to generate token data
     * @param user
     * @returns token
     */
    getLoginToken: function(user) {
        return JWT.sign(user, jwtSecret, {

        });
    },

    generateHash: (password) => {
        Bcrypt.genSalt(10, function (err, salt) {
            Bcrypt.hash(password, salt, function (err, hash) {
                return hash;
            });
        });
    }
};