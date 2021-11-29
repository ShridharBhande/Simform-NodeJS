var Mongoose = require('mongoose'),
    Bcrypt = require('bcryptjs'),
    ObjectId = Mongoose.Types.ObjectId,
    changeCase = require('change-case');

// User schema
var UserSchema = Mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    password: {
        type: String
    },
}, {timestamps: true});

var User = Mongoose.model('Users', UserSchema);

UserSchema.pre('save', function (next) {
    var self = this;
    if (this.password && this.isModified('password')) {
        Bcrypt.genSalt(10, function (err, salt) {
            Bcrypt.hash(self.password, salt, function (err, hash) {
                self.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Method to create new user.
 * @param newUser
 * @param callback
 */
User.createUser = function (newUser, callback) {
    newUser.save(callback);
};

//Get user data by email id
User.getEmail = function (email, callback) {
    User.findOne({'email': email}, callback);
};

/**
 * Method to get user data based on ID
 * @param ID
 * @param callback
 */
User.getUserById = (id, callback) => {
    User.findOne({ '_id': ObjectId(id) }, callback);
};

/**
 * Method to compare password.
 * @param candidatePassword
 * @param hash
 * @param callback
 */
 User.comparePassword = function (candidatePassword, hash, callback) {
    Bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            throw  err;
        }
        callback(null, isMatch);
    });
};

/**
 * Method to update user data 
 * @param body data
 * @param email id unique so no need to update
 * @param callback
 */

 User.edituser = function (userId, body, callback) {
    // Update only when wants update password
    if (body && body.password) {
        Bcrypt.genSalt(10, function (err, salt) {
            Bcrypt.hash(body.password, salt, function (err, hash) {
                User.update(
                    {
                        '_id': ObjectId(userId)
                    }, {
                        $set: {
                            'firstName': changeCase.upperCaseFirst(body.firstName),
                            'lastName': changeCase.upperCaseFirst(body.lastName),
                            'email': body.email,
                            'password': hash,
                            'profileImage': body.profileImage
                        }
                    }, callback);

            });
        });
    }  else {
        // Update only when there no requirement for the password update
        User.update(
            {
                '_id': ObjectId(userId)
            }, {
                $set: {
                    'firstName': changeCase.upperCaseFirst(body.firstName),
                    'lastName': changeCase.upperCaseFirst(body.lastName),
                    'email': body.email,
                    'profileImage': body.profileImage
                }
            }, callback);
    }    
};

module.exports = User;