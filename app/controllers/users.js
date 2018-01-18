// Load required packages
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var codes = require('../../configs/codes');
var messages = require('../../configs/messages');

function userController() {};

/**
* This will create a new user in user schema
* @method register
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
userController.register = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        role: 'user'
    });
    // save the sample user
    user.save(function(err) {
        if (err) {
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
            //throw err;
        } else {
            res.json({
                success: true,
                code: codes.Success,
                messages: messages.User_Reg
            });
        }
        
    });
};

/**
* This will validate the user with password and return a jwt token
* @method login
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
userController.login = function(req, res, app) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                code : codes.Unauthorized,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            user.verifyPassword(req.body.password, function(err, match) {
                if (err) {
                    res.json({
                        success: false,
                        code : codes.Unauthorized,
                        message: messages.Bad_Request
                    });
                } else if (!match) {
                    res.json({
                        success: false,
                        code : codes.Unauthorized,
                        message: messages.Wrong_Pass
                    });
                } else if (match) {
                    var token = jwt.sign(user, app.get('superSecret'));

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        code : codes.Success,
                        message: messages.Login,
                        token: token
                    });
                }
            });
        }
    });
}

module.exports = userController;