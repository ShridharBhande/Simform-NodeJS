var Express = require('express'),
    Router = Express.Router(),
    userController = require('../controllers/user.controller');

/*
 * Routes for Users APIs
 * 1. /signup => Create user
 * 2. /login => Login user
 * */
Router.route('/signup').all().post(userController.register);
Router.route('/login').all().post(userController.login);
Router.route('/getuser').all().get(userController.getuser);
Router.route('/edituser').all().post(userController.edituser);

module.exports = Router;