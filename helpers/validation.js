var validator = require('validator');

module.exports = {
    isEmptyOrNull: function (string) {
        if (string === undefined || string === null) {
            return true;
        } else if (validator.isEmpty(string.trim())) {
            return true;
        } else {
            return false;
        }
    },

    isEmail: function (email) {
        var emailData = email.trim();
        if (validator.isEmail(emailData)) {
            return false;
        } else {
            return true;
        }
    },

    isBoolean: function (string) {
        if (typeof (string) === "boolean") {
            return false;
        } else {
            return true;
        }
    },

    isMongoId: function (id) {
        if (validator.isMongoId(id)) {
            return false;
        } else {
            return true;
        }
    },

    isNumber: function (fieldName) {
        if (fieldName == undefined || fieldName === "") {
            return false;
        } else {
            var digits = fieldName.replace(/\D/g, "");
            if (digits.length === 10) {
                return false;
            } else {
                return true;
            }
        }
    },

    isName: function (fieldName) {
        if (fieldName) {
            fieldName = fieldName.trim();
            var fieldName1 = fieldName.replace(/[@!/ /&^-]+/g, '');
            if (validator.isAlpha(fieldName1)) {
                return false;
            }
            else {
                return true;
            }
        } else {
            return false;
        }
    }
};
