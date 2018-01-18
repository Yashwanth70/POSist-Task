var mongoose = require('mongoose');
var faker = require("faker");
var Customer = mongoose.model('Customer');
var Bill = mongoose.model('Bill');


/**
* Constructor for the bulkupload
*/
bilkUpload = function() {

 }


/**
* This will init the bulk process
* @method int
*/
bilkUpload.prototype.init = function() {
 	this.bulkCustomerInsert();
 }


/**
* This will insert the customer
* @method bulkCustomerInsert
*/
bilkUpload.prototype.bulkCustomerInsert = function() {
 	var that = this;
 	Customer.findOne({}, function(err, customer){
 		if(err){
 			console.log('Error while inserting customer data' ,err);
 		} else if ( customer ){
 			that.bulkBillInsertStart();
 		} else {
 			var customerCount = Math.floor(30 - Math.random()*(30-20));
		 	var dataToInsert = [];
		 	for (var i = 0; i < customerCount; i++ ) {
		 		var data = {
			 		name: faker.name.findName(),
			 		mobile: faker.phone.phoneNumber(),
			 		phone: faker.phone.phoneNumber(),
			 		dob: faker.date.past(),
			 		email: faker.internet.email(),
			 		addresses: []
			 	}
			 	var addressesCount = Math.floor(Math.random() * 3);
			 	for(var j = 0; j < addressesCount; j++ ) {
			 		data.addresses.push({
			 			"flat": faker.address.streetPrefix(),
			          	"street": faker.address.streetName(),
			          	"state": faker.address.state(),
			          	"pin": faker.address.zipCode()
			 		})
			 	}
			 	dataToInsert.push(data);
		 	}
		 	Customer.insertMany(dataToInsert, function(err, res){
		 		if(err){
		 			console.log('Error while inserting customer data' ,err);
		 		} else {
		 			that.bulkBillInsertStart();
		 		}
		 	});
 		}
 	});
 };

/**
* This will start the bill insertaion
* @method bulkBillInsertStart
*/
bilkUpload.prototype.bulkBillInsertStart = function() {
 	var that = this;
 	Customer.find({}, {_id:1}, function(err, customers){
 		if(err){
 			console.log('Error while fetching customer data' ,err);
 		} else if (customers.length == 0 ){
 			console.log('No customer recoard found');
 		} else {
 			Bill.findOne({}, function(err, bill){
 				if(err){
 					console.log('Error while inserting customer data' ,err);
 				} else if(bill){
 					console.log('Already have bill data');
 				} else {
 					that.bulkBillInsertFinal(customers)
 				}
 			});
 			
	 		
 		}
 	});
}

/**
* This will start the bill insertaion
* @method bulkBillInsertFinal
* @param customers object - customer list
*/
bilkUpload.prototype.bulkBillInsertFinal = function(customers) {
 	var billDataToInsert = []
	var billCount = Math.floor(10000 - Math.random()*(10000-7000)); 
	for(var i = 0; i < billCount; i++){
		var data = {
			date: faker.date.recent(),
			discount: (50 - Math.random()*(50-0)).toFixed(2),
			tax: (20 - Math.random()*(20-10)).toFixed(2),
			customer_id: customers[Math.floor(Math.random() * customers.length)]._id,
			number: i,
			items: [] 
		}
		var itemCount = Math.floor(5 - Math.random()*(5-1)); 
		for(var j = 0; j < itemCount; j++ ){
			data.items.push({
				name: faker.commerce.productName(),
		  		quantity: Math.floor(5 - Math.random()*(5-1)),
		  		rate: faker.commerce.price()
			});	
		}
		billDataToInsert.push(data);
	}
	Bill.insertMany(billDataToInsert, function(err, res){
 		if(err){
 			console.log('Error while inserting bill data' ,err);
 		} else {
 			console.log('All Bill data inserted');
 		}
 	});
}

 module.exports = bilkUpload;