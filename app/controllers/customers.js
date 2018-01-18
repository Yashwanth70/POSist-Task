
// Load required packages
var Customer = require('../models/customer');
var ObjectId = require('mongoose').Types.ObjectId;
var Bill = require('../models/bill');
var codes = require('../../configs/codes');
var messages = require('../../configs/messages');

function customerController() {};

/**
* This will create a new customer in customer collection
* @method create
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.create = function(req, res) {
	var data = req.body;
	if (!data.name) {
		res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Name'+messages.Key_Missing
            });
		return false;
	}
	if (!data.mobile) {
		res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Mobile'+messages.Key_Missing
            });
		return false;
	}
	if (!data.phone) {
		res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'phone'+messages.Key_Missing
            });
		return false;
	}
	if(!data.dob) {
		res.json({
                success: false,
                code:codes.Key_Missing,
                message: "DOB" + messages.Key_Missing
            });
		return false;
	}
	if (!data.email) {
		res.json({
                success: false,
                code:codes.Key_Missing,
                message: "Email" + messages.Key_Missing
            });
		return false;
	}

	if ( !data.addresses ) {
		data.addresses = [];
	}

	var customer = new Customer({
        name: data.name,
        mobile: data.mobile,
        phone: data.phone,
        dob: data.dob,
        email: data.email,
        addresses: data.addresses
    });
	// save the sample user
    customer.save(function(err) {
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
                message: messages.Cust_Reg
            });
        }
        
    });
};

/**
* This will update customer in customer collection
* @method update
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.update = function(req, res) {
    var data = req.body;
    if (!data.id) {
        res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Id'+messages.Key_Missing
            });
        return false;
    }
    if (!data.data) {
        res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Date'+messages.Key_Missing
            });
        return false;
    }
    Customer.update( { _id: data.id } , { $set:data.data }, {new :false}, function(err, customer){
        if(err){
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
        } else {
            res.json({
                success: true,
                code: codes.Success,
                message: messages.Cust_Update
            });
        }
    });
}

/**
* This will remove customer from customer collection
* @method remove
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.remove = function(req, res) {
    var data = req.body;
    console.log(req.body);
    if (!data.id) {
        res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Id'+messages.Key_Missing
            });
        return false;
    }
    
    Customer.remove( { _id: data.id }, function(err, customer){
        if(err){
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
        } else {
            res.json({
                success: true,
                code: codes.Success,
                message: messages.Cust_Remove
            });
        }
    });
}

/**
* This will return customer list from customer collection
* @method remove
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.list = function(req, res) {
    var filter = req.body.filter;
    var projection = req.body.projection;
    var limit = req.body.limit;
    var skip = req.body.skip;
    var sort = req.body.sort;
    
    if(!filter) {
        filter = {};
    }
    
    if (!projection) {
        projection = {}
    }
    if (!limit) {
        limit = 10;
    }
    if(!skip) {
        skip = 0;
    }
    if(!sort) {
        sort = {
            "$natural": -1
        }
    }
    
    Customer.find(filter, projection, { limit: limit, skip: skip, sort:sort }, function(err, customers){
        if(err){
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
        } else {
            res.json({
                success: true,
                code: codes.Success,
                message: messages.Cust_Find,
                data: customers
            });
        }
    });
};

/**
* This will return customer count from customer collection
* @method remove
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.count = function(req, res) {
    var filter = req.body.filter;
    
    if(!filter) {
        filter = {};
    }
      
    Customer.count(filter, function(err, count){
        if(err){
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
        } else {
            res.json({
                success: true,
                code: codes.Success,
                message: messages.Cust_Find,
                data: count
            });
        }
    });
};


/**
* This will return single customer from customer collection
* @method remove
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.getById = function(req, res) {
    var id = req.body.id;
    if (!id) {
        res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Id'+messages.Key_Missing
            });
        return false;
    }
    Customer.findById(id, function(err, customer){
        if(err){
            res.json({
                success: false,
                code:codes.Bad_Request,
                message: err.message ? err.message : messages.Bad_Request
            });
        } else {
            res.json({
                success: true,
                code: codes.Success,
                message: messages.Cust_Find,
                data: customer
            });
        }
    });
};

/**
* This will return customer report from customer collection
* @method remove
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
customerController.getReport = function(req, res) {
    var id = req.body.id;
    if (!id) {
        res.json({
                success: false,
                code:codes.Key_Missing,
                message: 'Id'+messages.Key_Missing
            });
        return false;
    }

    id = ObjectId(id);
    Bill.aggregate([
        {$match:
            {customer_id: id } 
        },
        { '$unwind': '$items' },
        { '$unwind': '$items' },
        { 
           '$project': {
               "items":1,
                "discount": 1,
                "tax":1,
                "itemSum": { '$multiply': ['$items.quantity', "$items.rate"] },
                discountAmount: {             
                    $let: {
                          vars: {
                               totalAmount: { '$multiply': ['$items.quantity', "$items.rate"] }
                          }, 
                          in : { "$divide": [ { "$multiply": [ '$$totalAmount', '$discount' ] }, 100 ] }
                   }
                }
            }
        },
        { 
            '$project': {
                "items":1,
                "discount": 1,
                "tax":1,
                "itemSum": 1,
                "discountAmount":1,
                "finalAmount": {             
                    $let: {
                          vars: {
                               taxAmount: { "$divide": [ { "$multiply": [ '$discountAmount', '$tax' ] }, 100 ] }
                          }, 
                          in : { $sum : [ { $subtract : [ '$itemSum', '$discountAmount' ] }, '$$taxAmount'] } 
                   }
                }
            }
        },
        { 
            '$group': { 
                '_id': null,
                'total': { '$sum': '$finalAmount' },
                'totalBills': { $sum: 1 }
            }
        },
        {
            '$project': {
                '_id': id,
                'total':1,
                'totalBills':1
            }
        },
        {
          $lookup:
            {
              from: "customers",
              localField: "_id",
              foreignField: "_id",
              as: "customer"
            }
       },
       { '$unwind': '$customer' },
       {
            '$project': {
                '_id':1,
                'total':1,
                'totalBills':1,
                'name':'$customer.name',
                'email':'$customer.email',
                'mobile':'$customer.mobile',
                'phone':'$customer.phone',
                
            }
        }], function(err , data){
            if (err){
                res.json({
                    success: false,
                    code:codes.Bad_Request,
                    message: err.message ? err.message : messages.Bad_Request
                });
            } else {
                var responseData = data[0];
                responseData.avgAmount = responseData.total / responseData.totalBills;
                res.json({
                    success: true,
                    code: codes.Success,
                    message: messages.Cust_Find,
                    data: responseData
                });
            }
        });
};

module.exports = customerController;