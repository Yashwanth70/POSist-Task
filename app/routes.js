var authMiddleware = require('./middlewares/auth');
var UserController = require('./controllers/users');
var CustomerController = require('./controllers/customers');

module.exports = function(app, apiRoutes) {

    /**
      ====================== User Routes Start =========================== 
    */

    //route to register a new user
    apiRoutes.post('/user/register', function(req, res) {
        UserController.register(req, res);
    });


    // route to authenticate a user
    apiRoutes.post('/user/login', function(req, res) {
        UserController.login(req, res, app);
    });


    /**
      ======================  User Routes End ============================= 
    */

    // route middleware to verify a token
    apiRoutes.use(authMiddleware(app));

    /**
      ====================== Customer Routes Start =========================== 
    */

    //route to register a new customer
    apiRoutes.post('/customer/create', function(req, res) {
        CustomerController.create(req, res);
    });


    //route to update customer
    apiRoutes.post('/customer/update', function(req, res) {
        CustomerController.update(req, res);
    });

    //route to update customer
    apiRoutes.delete('/customer/remove', function(req, res) {
        CustomerController.remove(req, res);
    });

    //route to get customer by id
    apiRoutes.post('/customer/getById', function(req, res) {
        CustomerController.getById(req, res);
    });

    //route to get customer list
    apiRoutes.post('/customer/list', function(req, res) {
        CustomerController.list(req, res);
    });

    //route to get customer count
    apiRoutes.post('/customer/count', function(req, res) {
        CustomerController.count(req, res);
    });

    //route to get customer report
    apiRoutes.post('/customer/getReport', function(req, res) {
        CustomerController.getReport(req, res);
    });

    /**
      ====================== Customer Routes End =========================== 
    */

    // route to show a random message (GET http://localhost:3000/api/)
    apiRoutes.get('/', function(req, res) {
        res.json({
            message: 'Welcome to the coolest API on earth!'
        });
    });

	app.use('/api', apiRoutes);

    //all other routes are handled by Angular
    
}