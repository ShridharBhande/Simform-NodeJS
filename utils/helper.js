module.exports = {
    /**
     * Method to convert multiple words into fist letter capital
     * @param {String} carrierName
     * @returns modified string
     */
    toTitleCase: function (stringName) {
        var name = stringName.trim();
        return name.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    /**
     * Method to send get token time
     */
    getTokenTime: function () {
        var expiresIn = (24 * 60 * 60 * 1000);
        return expiresIn;
    },
};