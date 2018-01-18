// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

var User = require('./user');
require('./customer');
require('./bill')

var mongoConfig = require('../../configs/db.json')['development'];
var bulkUpload = require('../helpers/bulkUpload');
var BulkUpload = new bulkUpload();
mongoose.Promise = global.Promise;

// Build the connection string 
var dbURI = 'mongodb://'+mongoConfig.host+':'+ mongoConfig.port +'/'+ mongoConfig.database; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
  BulkUpload.init();
  User.findOne({}, function(err, user){
  	if(err){
  		console.log('Error while finding user', err);
  	} else if ( !user ){
  		var user = new User({
	        username: 'admin',
	        password: 'admin',
	        role: 'admin'
	    });
	    user.save(function(err){
	    	if(err){
	    		console.log('Error while User Created',err);
	    	} else {
	    		console.log('User Created successfully');
	    	}
	    });
  	} else {
  		console.log('User Alredy Exist');
  	}
  })
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});