var jwt = require('jsonwebtoken');
var codes = require('../../configs/codes');
var messages = require('../../configs/messages');

module.exports = function(app) {
    return function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        code: codes.Invalide_Token,
                        message: messages.Invalide_Token
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                code: codes.Token_Missing,
                message: messages.Token_Missing
            });

        }
    }
};