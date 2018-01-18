var superagent = require('superagent');

describe("User Test", function(){
    /*
    before(function(done) {
		
  	});

  	beforeEach(function(done){
  		
  	});
    */

  	it("register", function(done){
  		var registerData = {
  			username: 'username',
        password: 'password'
  		};
  	  	superagent.post('http://localhost:3000/api/register', registerData).end(function(res){
          //console.log(res.text);
          done();
        })
  	});

  	it("invalid-register-1", function(done){
  		var registerData = {
            password: 'password'
  		};
      done();
  	  	
  	});

  	it("invalid-register-2", function(done){
  		var registerData = {
  			username: 'username'
  		};
      done();
  	});
});